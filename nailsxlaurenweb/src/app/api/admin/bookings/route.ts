// app/api/admin/bookings/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const JWT_SECRET = process.env.JWT_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Check for required environment variables
if (!JWT_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required environment variables:', {
    JWT_SECRET: !!JWT_SECRET,
    SUPABASE_URL: !!SUPABASE_URL,
    SUPABASE_SERVICE_KEY: !!SUPABASE_SERVICE_KEY
  });
}

// Only create Supabase client if environment variables are available
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false },
    })
  : null;

export async function GET(req: NextRequest) {
  console.log('🚀 API GET /api/admin/bookings called at:', new Date().toISOString());
  
  // Check if Supabase is configured
  if (!supabase) {
    console.log('❌ Database not configured');
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  // Auth: validate nxla_admin cookie
  const token = req.cookies.get('nxla_admin')?.value;
  if (!token) {
    console.log('❌ No auth token');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET!);
    console.log('✅ Auth token valid');
  } catch {
    console.log('❌ Invalid auth token');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const search = url.searchParams.get('search') ?? '';
  const page = Math.max(parseInt(url.searchParams.get('page') || '1'), 1);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '20'), 1), 200);
  const offset = (page - 1) * limit;
  
  console.log('📊 Query params:', { search, page, limit, offset });

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
      const s = `%${search.trim().toLowerCase()}%`;
      // Use filter chaining with or() - Supabase supports .or()
      // fields: full_name, phone_number, email, message, preferred_date::text, preferred_time::text
      const orFilter = [
        `full_name.ilike.${s}`,
        `phone_number.ilike.${s}`,
        `email.ilike.${s}`,
        `message.ilike.${s}`,
        // cast date/time to text to search by partial date/time if desired
        `preferred_date::text.ilike.${s}`,
        `preferred_time::text.ilike.${s}`
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
      console.error('❌ Supabase error', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    console.log('✅ Database query successful:', { dataLength: data?.length, count, page, limit });
    
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
    console.error('❌ Server error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
