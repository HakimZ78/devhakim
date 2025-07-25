import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /admin/dashboard)
  const path = request.nextUrl.pathname;

  // Define protected routes that require authentication
  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin';

  // For now, we'll rely on client-side protection since we're using localStorage
  // In a production app, you'd check for a session cookie here
  
  // Allow all requests to proceed
  // The admin layout component will handle client-side redirects
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};