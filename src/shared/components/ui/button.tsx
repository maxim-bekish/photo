import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

const buttonVariants = cva(
	' inline-flex mix-blend-exclusion w-fit items-center h-[50px] group  duration-300 border-white cursor-pointer',
	{
		variants: {
			variant: {
				ghost: '[&>p]:group-hover:text-deep-orange gap-2 [&>div]:hidden [&>div]:md:block',
				outline:
					'border-solid [&>p]:px-5 [&>p]:border [&_.wrap-icon]:border [&_.wrap-icon]:border-l-0 [&>div]:group-hover:bg-white [&_.icon]:group-hover:text-black [&>div]:aspect-square',
			},
		},
		defaultVariants: {
			variant: 'ghost',
		},
	},
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
	className?: string;
	href?: string;
	label?: string;

	children?: React.ReactNode;
}

function Button({ className = '', variant, children, href, label }: ButtonProps) {
	const Btn = href ? 'a' : 'button';

	return (
		<Btn href={href} className={clsx(buttonVariants({ variant }), className)}>
			<p className='h-full duration-300 flex items-center uppercase border-inherit  text-btn'>
				{children ? children : label}
			</p>

			<div className='border-inherit wrap-icon h-full flex items-center justify-center duration-300'>
				<ArrowRight
					strokeWidth={1}
					className='h-full icon transition-transform duration-300  group-hover:-rotate-45'
				/>
			</div>
		</Btn>
	);
}

export { Button, buttonVariants };
