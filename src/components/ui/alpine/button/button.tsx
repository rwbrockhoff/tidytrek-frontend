import React, { forwardRef } from 'react';
import { cn } from '@/styles/utils';
import styles from './button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'danger' | 'outline' | 'secondary' | 'ghost' | 'link';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'default',
			size = 'md',
			loading = false,
			iconLeft,
			iconRight,
			className,
			disabled,
			children,
			...props
		},
		ref,
	) => {
		// no children and has icon component
		const isIconOnly = !children && (iconLeft || iconRight) ? true : false;

		const buttonClasses = cn(
			styles.button,
			variant === 'default' && styles.buttonDefault,
			variant === 'danger' && styles.buttonDanger,
			variant === 'outline' && styles.buttonOutline,
			variant === 'secondary' && styles.buttonSecondary,
			variant === 'ghost' && styles.buttonGhost,
			variant === 'link' && styles.buttonLink,
			size === 'sm' && styles.buttonSm,
			size === 'md' && styles.buttonMd,
			size === 'lg' && styles.buttonLg,
			loading && styles.buttonLoading,
			(disabled || loading) && styles.buttonDisabled,
			isIconOnly && styles.buttonIconOnly,
			className,
		);

		return (
			<button
				ref={ref}
				className={buttonClasses}
				disabled={disabled || loading}
				{...props}>
				{loading && <span className={styles.spinner} />}
				{iconLeft && !loading && <span className={styles.iconLeft}>{iconLeft}</span>}
				{children}
				{iconRight && !loading && <span className={styles.iconRight}>{iconRight}</span>}
			</button>
		);
	},
);

Button.displayName = 'Button';

export { Button };
