import React, { forwardRef } from 'react';
import { cn } from '@/styles/utils';
import styles from './button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
	color?: 'primary' | 'secondary' | 'tertiary' | 'info' | 'danger';
	customColor?: string;
	size?: 'sm' | 'md' | 'lg';
	radius?: 'default' | 'circle';
	loading?: boolean;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	override?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'default',
			color = 'primary',
			customColor,
			size = 'md',
			radius = 'default',
			loading = false,
			iconLeft,
			iconRight,
			override = false,
			className,
			disabled,
			children,
			style,
			...props
		},
		ref,
	) => {
		// no children and has icon component
		const isIconOnly = !children && (iconLeft || iconRight) ? true : false;

		const buttonClasses = cn(
			styles.button,
			variant === 'default' && styles.buttonDefault,
			variant === 'outline' && styles.buttonOutline,
			variant === 'secondary' && styles.buttonSecondary,
			variant === 'ghost' && styles.buttonGhost,
			variant === 'link' && styles.buttonLink,
			!customColor && color === 'primary' && styles.buttonColorPrimary,
			!customColor && color === 'secondary' && styles.buttonColorSecondary,
			!customColor && color === 'tertiary' && styles.buttonColorTertiary,
			!customColor && color === 'info' && styles.buttonColorInfo,
			!customColor && color === 'danger' && styles.buttonColorDanger,
			customColor && styles.buttonCustomColor,
			size === 'sm' && styles.buttonSm,
			size === 'md' && styles.buttonMd,
			size === 'lg' && styles.buttonLg,
			radius === 'circle' && styles.buttonRadiusCircle,
			loading && styles.buttonLoading,
			(disabled || loading) && styles.buttonDisabled,
			isIconOnly && styles.buttonIconOnly,
			override && 'aow',
			className,
		);

		const buttonStyle = customColor
			? {
					'--button-custom-color': customColor,
					...style,
				}
			: style;

		return (
			<button
				ref={ref}
				className={buttonClasses}
				style={buttonStyle}
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
