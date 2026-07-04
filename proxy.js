import { NextResponse } from 'next/server';

export function proxy(req) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;
  const protectedPath = pathname.startsWith('/dashboard');

  if (protectedPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
