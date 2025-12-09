import { isAuthenticated } from '@/src/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminNav } from './AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const authenticated = await isAuthenticated();

	if (!authenticated) {
		redirect('/admin-login');
	}

	return (
		<div className='min-h-screen bg-gray-900'>
			<AdminNav />
			<main className='max-w-7xl mx-auto py-6 px-4'>{children}</main>
		</div>
	);
}
