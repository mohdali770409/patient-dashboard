import  { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the protected routes
const protectedRoutes = ['/patients-management',"/dashboard-overview","/appointments"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('ugm-jwt-token')?.value; // Use cookies to check for the JWT token
  // Redirect logged-in users away from the login page
  if (req.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/patients-management', req.url)); // Redirect to home page or another appropriate page
    }
  }

  // Protect other routes if no token is found
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Continue with the request
  return NextResponse.next();
}

// Define the routes that should use the middleware
export const config = {
  matcher: [
    '/login',
    '/patients-management/:path*',
    '/dashboard-overview/:path*',
    '/appointments/:path*',
    
  ]
};