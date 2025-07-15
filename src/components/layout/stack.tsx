import { ReactNode } from 'react';
import { cn } from '@/styles/utils';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Stack = ({ children, className, ...props }: StackProps) => {
	return (
		<div className={cn('flex flex-col', className)} {...props}>
			{children}
		</div>
	);
};