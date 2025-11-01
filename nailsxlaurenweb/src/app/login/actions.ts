'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const username = formData.get('username') as string

  console.log('username', username)
  // Check if username exists in users table
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !user) {
    redirect('/error')
  }

  // Ensure user.id exists
  if (!user.id) {
    console.error('User ID is missing')
    redirect('/error')
  }

  // Set a simple session cookie with explicit path
  const cookieStore = await cookies()
  const userId = String(user.id)
  
  console.log('[Login Action] Setting cookie:', {
    userId,
    username: user.username
  })
  
  cookieStore.set('admin_session', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/', // Explicitly set path to root
    maxAge: 60 * 60 * 24 // 24 hours
  })

  // Verify cookie was set
  const setCookie = cookieStore.get('admin_session')
  console.log('[Login Action] Cookie verification:', {
    set: !!setCookie,
    value: setCookie?.value
  })

  // Revalidate paths to ensure fresh data
  revalidatePath('/', 'layout')
  revalidatePath('/adminpage', 'page')
  
  console.log('[Login Action] Redirecting to /adminpage?login=success')
  // Redirect with success parameter
  redirect('/adminpage?login=success')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  revalidatePath('/', 'layout')
  redirect('/')
}