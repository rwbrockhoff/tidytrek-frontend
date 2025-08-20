import { ReactNode, forwardRef } from 'react';
import { cn } from '@/styles/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn('grid', className)} {...props}>
				{children}
			</div>
		);
	}
);

Grid.displayName = 'Grid';