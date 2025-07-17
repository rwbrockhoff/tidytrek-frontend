import { ReactNode, forwardRef } from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
	({ children, className, ...props }, ref) => {
		return (
			<div ref={ref} className={className} {...props}>
				{children}
			</div>
		);
	}
);

Box.displayName = 'Box';