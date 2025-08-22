import React, { forwardRef } from 'react';
import { CheckIcon, ErrorIcon, InfoIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './alert.module.css';

type AlertVariant = 'default' | 'success' | 'error';
type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: AlertVariant;
	size?: AlertSize;
	shadow?: 'classic' | 'spread' | 'paper';
	rounded?: boolean;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	override?: boolean;
}

const defaultIconMap = {
	default: InfoIcon,
	success: CheckIcon,
	error: ErrorIcon,
} as const;

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	(
		{
			variant = 'default',
			size = 'md',
			shadow = false,
			rounded = false,
			iconLeft,
			iconRight,
			override = false,
			className,
			children,
			...props
		},
		ref,
	) => {
		// Use custom icon or fallback to default variant icon
		const DefaultIcon = defaultIconMap[variant];
		const leftIcon = iconLeft || (variant !== 'default' && DefaultIcon ? <DefaultIcon /> : null);

		const alertClasses = cn(
			styles.alert,
			styles[variant],
			styles[size],
			shadow === 'classic' && styles.alertShadowClassic,
			shadow === 'spread' && styles.alertShadowSpread,
			shadow === 'paper' && styles.alertShadowPaper,
			rounded && styles.alertRounded,
			override && 'aow',
			className,
		);

		return (
			<div
				ref={ref}
				className={alertClasses}
				role="alert"
				aria-live="polite"
				{...props}>
				{leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}

				<div className={styles.content}>{children}</div>

				{iconRight && <span className={styles.iconRight}>{iconRight}</span>}
			</div>
		);
	},
);

Alert.displayName = 'Alert';

export { Alert };
