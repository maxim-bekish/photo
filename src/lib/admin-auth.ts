import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
	return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function isAuthenticated(): Promise<boolean> {
	const cookieStore = await cookies();
	const token = cookieStore.get('admin_token');
	return token?.value === 'authenticated';
}

export async function setAuthToken() {
	const cookieStore = await cookies();
	cookieStore.set('admin_token', 'authenticated', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7, // 7 дней
	});
}

export async function clearAuthToken() {
	const cookieStore = await cookies();
	cookieStore.delete('admin_token');
}

