import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const username = formData.get('username') as string;

    console.log('[Login Route] Received request:', {
      username,
      usernameType: typeof username,
      usernameLength: username?.length,
      formDataKeys: Array.from(formData.keys())
    });

    if (!username) {
      console.log('[Login Route] No username provided');
      // Redirect to home with error parameter for form submissions
      return NextResponse.redirect(new URL('/?login=error&message=Username required', request.url));
    }

    const supabase = await createClient();
    
    console.log('[Login Route] Querying database for username:', username.trim());
    
    // Check if username exists in users table
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username.trim()) // Trim whitespace
      .single();

    console.log('[Login Route] Database query result:', {
      hasUser: !!user,
      userId: user?.id,
      userUsername: user?.username,
      error: error ? {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      } : null
    });

    if (error) {
      console.log('[Login Route] Supabase error:', error);
      // Redirect to home with error for form submissions
      if (error.code === 'PGRST116') {
        return NextResponse.redirect(new URL('/?login=error&message=Invalid username', request.url));
      }
      return NextResponse.redirect(new URL('/?login=error&message=Database error', request.url));
    }

    if (!user) {
      console.log('[Login Route] No user found with username:', username);
      return NextResponse.redirect(new URL('/?login=error&message=Invalid username', request.url));
    }

    // Ensure user.id exists
    if (!user.id) {
      console.error('User ID is missing');
      return NextResponse.redirect(new URL('/?login=error&message=User ID missing', request.url));
    }

    // Create redirect URL
    const redirectUrl = new URL('/adminpage?login=success', request.url);
    
    // Create response with redirect (307 preserves POST method, but we want GET)
    const response = NextResponse.redirect(redirectUrl, { status: 302 });
    
    // Set cookie in the response headers
    const userId = String(user.id);
    response.cookies.set('admin_session', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    console.log('[Login Route] Cookie set in response:', { 
      userId, 
      username: user.username,
      cookieSet: response.cookies.get('admin_session')?.value 
    });
    
    return response;
  } catch (error) {
    console.error('[Login Route] Error:', error);
    return NextResponse.redirect(new URL('/?login=error&message=Server error', request.url));
  }
}

