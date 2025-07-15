import { ReactNode, forwardRef } from 'react';
import { cn } from '@/styles/utils';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex', className)} {...props}>
				{children}
			</div>
		);
	}
);

Flex.displayName = 'Flex';