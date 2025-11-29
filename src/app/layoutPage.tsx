import { PreviewTitle } from '../shared/components/ui/PreviewTitle';

export default function LayoutPage({
	children,
	title,
}: Readonly<{
	children: React.ReactNode;
	title: string;
}>) {
	return (
		<section>
			<PreviewTitle title={title} />
			<div className='px-(--px) md:pb-[100px] pb-[60px]'>{children}</div>
		</section>
	);
}
