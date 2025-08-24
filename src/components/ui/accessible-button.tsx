import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	'aria-label': string;
}

// Makes it semantically clear when a button is being used to improve accessibility
// Reqires aria-label in type

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
	({ children, type = 'button', ...props }, ref) => {
		return (
			<button ref={ref} type={type} {...props}>
				{children}
			</button>
		);
	},
);

AccessibleButton.displayName = 'AccessibleButton';
