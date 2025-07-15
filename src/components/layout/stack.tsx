import { ReactNode, forwardRef } from 'react';
import { cn } from '@/styles/utils';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex flex-col', className)} {...props}>
				{children}
			</div>
		);
	}
);

Stack.displayName = 'Stack';