// app/api/admin/bookings/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check for required environment variables
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables:', {
    SUPABASE_URL: !!SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!SUPABASE_SERVICE_ROLE_KEY
  });
}

// Create Supabase client with service role for admin operations
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
  : null;

export async function GET(req: NextRequest) {
  console.log(' API GET /api/admin/bookings called at:', new Date().toISOString());
  
  // Check if Supabase is configured
  if (!supabase) {
    console.log(' Database not configured');
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  // Auth: Check custom session
  const adminSession = req.cookies.get('admin_session')?.value;
  
  if (!adminSession) {
    console.log(' No admin session');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  console.log(' Admin session valid');

  const url = new URL(req.url);
  const search = url.searchParams.get('search') ?? '';
  const page = Math.max(parseInt(url.searchParams.get('page') || '1'), 1);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '20'), 1), 200);
  const offset = (page - 1) * limit;
  
  console.log('Query params:', { search, page, limit, offset });

  // Build search filter across multiple columns (case-insensitive)
  // We'll use Postgres ilike via Supabase RPC style filters with .ilike
  // If empty search, fetch normally
  try {
    let query = supabase
      .from('bookings')
      .select('*', { count: 'exact' })
      .order('created_on', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      const searchPattern = `%${encodeURIComponent(searchTerm)}%`;
      
      // PostgREST filter syntax requires proper encoding for special characters
      // URL encode the search term to handle spaces and special characters
      // The format is: column.operator.value where value is URL encoded
      const orFilter = [
        `full_name.ilike.${searchPattern}`,
        `phone_number.ilike.${searchPattern}`,
        `email.ilike.${searchPattern}`,
        `message.ilike.${searchPattern}`
      ].join(',');

      query = supabase
        .from('bookings')
        .select('*', { count: 'exact' })
        .or(orFilter)
        .order('created_on', { ascending: false })
        .range(offset, offset + limit - 1);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error(' Supabase error', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    console.log(' Database query successful:', { dataLength: data?.length, count, page, limit });
    
    const response = {
      data,
      count,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    };
    
    console.log('📤 Sending response:', { totalPages: response.totalPages });
    return NextResponse.json(response);
  } catch (err) {
    console.error(' Server error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  console.log('🗑️ API DELETE /api/admin/bookings called at:', new Date().toISOString());
  
  // Check if Supabase is configured
  if (!supabase) {
    console.log(' Database not configured');
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  // Auth: Check custom session
  const adminSession = req.cookies.get('admin_session')?.value;
  
  if (!adminSession) {
    console.log(' No admin session');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  console.log(' Admin session valid');

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    console.log(' Deleting booking with ID:', id);

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(' Supabase delete error', error);
      return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }

    console.log('✅ Booking deleted successfully');
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(' Server error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
