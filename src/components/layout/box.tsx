import { ReactNode, forwardRef } from 'react';
import { cn } from '@/styles/utils';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(className)} {...props}>
				{children}
			</div>
		);
	}
);

Box.displayName = 'Box';