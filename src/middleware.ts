import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userCookie = request.cookies.get('auth_role')?.value?.toLowerCase();
    const { pathname } = request.nextUrl;

    // Si intenta acceder a rutas protegidas sin estar logueado
    if (!userCookie && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // RBAC: Redirigir según el rol
    if (pathname === '/dashboard') {
        if (userCookie === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        if (userCookie === 'user' || userCookie === 'customer') {
            return NextResponse.redirect(new URL('/user', request.url));
        }
        return NextResponse.next();
    }

    // Evitar que el admin entre a /user o el user a /admin
    if (pathname.startsWith('/user') && userCookie !== 'user' && userCookie !== 'customer') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    if (pathname.startsWith('/admin') && userCookie !== 'admin') {
        const target = (userCookie === 'user' || userCookie === 'customer') ? '/user' : '/login';
        return NextResponse.redirect(new URL(target, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/user/:path*'],
};
