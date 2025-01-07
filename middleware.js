import { NextResponse } from 'next/server';

// Paths that don't require authentication
const publicPaths = ['/login', '/signup'];

export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

    // If the user is not authenticated and tries to access a private page, redirect to login
    if (!token && !isPublicPath) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // If the user is authenticated and tries to access the login or signup page, redirect to home
    if (token && request.nextUrl.pathname.startsWith('/login')) {
        const homeUrl = new URL('/', request.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/protected/:path*'], // Define routes to protect
};
