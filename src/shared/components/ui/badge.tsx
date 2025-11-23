import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/src/shared/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-[22px] border border-matt-black/10 px-2 py-1 uppercase body1 text-creamy-white w-fit whitespace-nowrap shrink-0 overflow-hidden ',
	{
		variants: {
			variant: {
				primary: 'bg-white/20',
				secondary: 'bg-white/10',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp data-slot='badge' className={cn(badgeVariants({ variant }), className, '')} {...props} />
	);
}

export { Badge, badgeVariants };
