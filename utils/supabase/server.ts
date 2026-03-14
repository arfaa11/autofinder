import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("CRITICAL: NEXT_PUBLIC_SUPABASE_URL is missing from environment!");
}

// This function initializes the connection to Supabase for your Server Actions
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    // These keys tell Supabase exactly which project to talk to
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        // Handles reading existing user sessions from browser cookies
        getAll() {
          return cookieStore.getAll()
        },
        // Handles saving new session data back to the browser
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Silence error: This block is expected when running in 
            // Server Components during a request/response cycle
          }
        },
      },
    }
  )
}