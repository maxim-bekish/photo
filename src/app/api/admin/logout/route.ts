import { NextResponse } from 'next/server';
import { clearAuthToken } from '@/src/lib/admin-auth';

export async function POST() {
	await clearAuthToken();
	return NextResponse.json({ success: true });
}

