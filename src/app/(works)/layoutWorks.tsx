import { WorksTab } from '@/src/shared/components/ui/WorksTab';
import LayoutPage from '../layoutPage';

export default function LayoutWorks({
	children,
	title,
	className,
}: Readonly<{
	children: React.ReactNode;
	title: string;
	className?: string;
}>) {
	return (
		<LayoutPage title={title}>
			<div className='wrapper flex flex-col gap-14 items-center'>
				<WorksTab />
				<div className={`grid grid-cols-1 xl:grid-cols-2 w-full ${className}`}>{children}</div>
			</div>
		</LayoutPage>
	);
}
