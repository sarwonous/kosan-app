import getSupabase from '@/lib/supabase-server';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabaseClient = getSupabase(cookieStore);
  return NextResponse.json({ ok: "ok" })
}