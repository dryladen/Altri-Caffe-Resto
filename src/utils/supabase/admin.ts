import { createClient } from "@supabase/supabase-js";
export function createServerAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
