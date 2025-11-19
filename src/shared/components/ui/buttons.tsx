import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/src/shared/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center   whitespace-nowrap [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				ghost: 'items-center  group hover:text-orange-300   ',
				outline: 'items-center  border border-white  uppercase',
				// ---
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				// outline:
				// 	'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				// ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				// link: 'text-primary text-muted-foreground hover:text-foreground transition-colors    ',
			},
			size: {
				default: 'px-5 py-4     ',
				sm: 'h-8  gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10  px-6 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

function Button({
	className,
	variant,
	size,

	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
