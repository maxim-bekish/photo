import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('admin_token');

	// Если запрос к админке (кроме страницы логина)
	if (
		request.nextUrl.pathname.startsWith('/admin') &&
		!request.nextUrl.pathname.startsWith('/api/admin/login')
	) {
		if (!token || token.value !== 'authenticated') {
			return NextResponse.redirect(new URL('/admin-login', request.url));
		}
	}

	// Если запрос к API админки (кроме login и supabase-auth)
	if (
		request.nextUrl.pathname.startsWith('/api/admin') &&
		!request.nextUrl.pathname.startsWith('/api/admin/login') &&
		!request.nextUrl.pathname.startsWith('/api/admin/supabase-auth')
	) {
		if (!token || token.value !== 'authenticated') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*', '/api/admin/:path*'],
};

