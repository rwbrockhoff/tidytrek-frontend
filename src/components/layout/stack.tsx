import { ReactNode, forwardRef } from 'react';
import { cn } from '@/styles/utils';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
	stretch?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
	({ children, className, stretch = true, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex flex-col', !stretch && 'items-start', className)} {...props}>
				{children}
			</div>
		);
	}
);

Stack.displayName = 'Stack';