import { ReactNode } from 'react';
import { cn } from '@/styles/utils';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Flex = ({ children, className, ...props }: FlexProps) => {
	return (
		<div className={cn('flex', className)} {...props}>
			{children}
		</div>
	);
};