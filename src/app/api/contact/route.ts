import { assertVercelPostgresEnv, sql } from '@/src/lib/vercel-db';
import { ContactRequest } from '@/src/shared/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	let body: Partial<ContactRequest>;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
	}

	const name = body.name?.trim();
	const email = body.email?.trim() || null;
	const phone = body.phone?.trim() || null;
	const message = body.message?.trim();

	if (!name || !message) {
		return NextResponse.json({ error: 'Укажите имя и сообщение' }, { status: 400 });
	}
	if (!email && !phone) {
		return NextResponse.json({ error: 'Укажите email или телефон для связи' }, { status: 400 });
	}

	try {
		assertVercelPostgresEnv();
		await sql`
			INSERT INTO contact_requests (name, email, phone, message)
			VALUES (${name}, ${email}, ${phone}, ${message});
		`;
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Ошибка сохранения заявки:', error);
		return NextResponse.json({ error: 'Не удалось отправить заявку' }, { status: 500 });
	}
}
