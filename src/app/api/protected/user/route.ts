import { createHash, Hash } from 'crypto';
import { getUser } from '@/lib/auth';
import getSupabase from '@/lib/supabase-server';
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = getSupabase(cookieStore);
  const { data: profile, count } = await client.from('customers').select('*').eq('user_id', (await user).id).single();
  if (!profile || count === 0) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const hash = createHash('sha256');
  return NextResponse.json({
    profile: {
      ...profile,
      email: profile.email || user.email || '',
      avatar: hash.update(String(profile.avatar || user.user_metadata?.avatar_url || '').trim()).digest('hex'),
      role: user.role,
      phone: profile.phone || user.phone || '',
    }
  }, { status: 200 });
}