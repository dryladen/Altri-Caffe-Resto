import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // menuju dashboard
    '/dashboard',
    '/orders',
    '/products',
    '/categories',
    '/users',
    '/account',

    // /*
    //  * Match all request paths except for the ones starting with:
    //  * - _next/static (static files)
    //  * - _next/image (image optimization files)
    //  * - favicon.ico (favicon file)
    //  * Feel free to modify this pattern to include more paths.
    //  * first page load
    //  */
    // // expect / 
    // '/((?!checkout|cart|confirmation|customer|receipt|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$))',
  ],
}