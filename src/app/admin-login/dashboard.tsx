'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				router.push('/admin/login');
			} else {
				setLoading(false);
			}
		};
		checkUser();
	}, [router]);

	if (loading) return <p>Загрузка...</p>;

	return <h1>Добро пожаловать в админку</h1>;
}
