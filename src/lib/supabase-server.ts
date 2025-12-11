import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseServerInstance: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
	if (supabaseServerInstance) {
		return supabaseServerInstance;
	}

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl) {
		throw new Error('NEXT_PUBLIC_SUPABASE_URL не установлен в переменных окружения');
	}

	if (!supabaseServiceKey) {
		throw new Error('SUPABASE_SERVICE_ROLE_KEY не установлен в переменных окружения');
	}

	supabaseServerInstance = createClient(supabaseUrl, supabaseServiceKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	return supabaseServerInstance;
}
