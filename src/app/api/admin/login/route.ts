import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, setAuthToken } from '@/src/lib/admin-auth';

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		const isValid = await verifyAdmin(email, password);

		if (!isValid) {
			return NextResponse.json({ error: 'Неверные данные' }, { status: 401 });
		}

		await setAuthToken();

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
	}
}

