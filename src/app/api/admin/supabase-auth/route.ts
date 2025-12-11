import { setAuthToken } from '@/src/lib/admin-auth';
import { getSupabaseServer } from '@/src/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { access_token } = await request.json();

		if (!access_token) {
			return NextResponse.json({ error: 'Токен не предоставлен' }, { status: 401 });
		}

		let supabaseServer;
		try {
			supabaseServer = getSupabaseServer();
		} catch (envError) {
			return NextResponse.json(
				{ error: envError instanceof Error ? envError.message : 'Ошибка конфигурации сервера' },
				{ status: 500 }
			);
		}

		const {
			data: { user },
			error,
		} = await supabaseServer.auth.getUser(access_token);

		if (error || !user) {
			return NextResponse.json({ error: 'Неверный токен' }, { status: 401 });
		}

		await setAuthToken();

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
	}
}
