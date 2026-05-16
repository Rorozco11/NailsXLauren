import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

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

    if (!supabase) {
      console.log('[Login Route] Database not configured');
      return NextResponse.redirect(new URL('/?login=error&message=Database not configured', request.url), { status: 303 });
    }

    if (!username) {
      console.log('[Login Route] No username provided');
      return NextResponse.redirect(new URL('/?login=error&message=Username required', request.url), { status: 303 });
    }

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
        return NextResponse.redirect(new URL('/?login=error&message=Invalid username', request.url), { status: 303 });
      }
      return NextResponse.redirect(new URL('/?login=error&message=Database error', request.url), { status: 303 });
    }

    if (!user) {
      console.log('[Login Route] No user found with username:', username);
      return NextResponse.redirect(new URL('/?login=error&message=Invalid username', request.url), { status: 303 });
    }

    // Ensure user.id exists
    if (!user.id) {
      console.error('User ID is missing');
      return NextResponse.redirect(new URL('/?login=error&message=User ID missing', request.url), { status: 303 });
    }

    // Create redirect URL
    const redirectUrl = new URL('/adminpage?login=success', request.url);

    // 303 See Other → forces browser to GET the redirect target
    const response = NextResponse.redirect(redirectUrl, { status: 303 });
    
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
    return NextResponse.redirect(new URL('/?login=error&message=Server error', request.url), { status: 303 });
  }
}

