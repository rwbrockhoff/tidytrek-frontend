import React, { forwardRef } from 'react';
import { cn } from '@/styles/utils';
import styles from './card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'surface' | 'ghost';
	size?: '1' | '2' | '3';
	rounded?: boolean | 'sm' | 'md' | 'lg';
	shadow?: boolean | 'classic' | 'spread' | 'paper';
	interactive?: boolean;
	override?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Root = forwardRef<HTMLDivElement, CardProps>(
	(
		{
			variant = 'default',
			size = '2',
			rounded = false,
			shadow = false,
			interactive = false,
			override = false,
			className,
			children,
			...props
		},
		ref,
	) => {
		const cardClasses = cn(
			styles.card,
			variant === 'default' && styles.cardDefault,
			variant === 'surface' && styles.cardSurface,
			variant === 'ghost' && styles.cardGhost,
			size === '1' && styles.cardSize1,
			size === '2' && styles.cardSize2,
			size === '3' && styles.cardSize3,
			interactive && styles.cardInteractive,
			// Rounded styles
			rounded === true && styles.cardRounded,
			rounded === 'sm' && styles.cardRoundedSm,
			rounded === 'md' && styles.cardRoundedMd,
			rounded === 'lg' && styles.cardRoundedLg,
			// Shadow styles
			shadow === true && styles.cardShadowClassic,
			shadow === 'classic' && styles.cardShadowClassic,
			shadow === 'spread' && styles.cardShadowSpread,
			shadow === 'paper' && styles.cardShadowPaper,
			override && 'aow',
			className,
		);

		return (
			<div ref={ref} className={cardClasses} {...props}>
				{children}
			</div>
		);
	},
);

Root.displayName = 'CardRoot';

const Header = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles.header, className)} {...props}>
				{children}
			</div>
		);
	},
);

Header.displayName = 'CardHeader';

const Body = forwardRef<HTMLDivElement, CardBodyProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles.body, className)} {...props}>
				{children}
			</div>
		);
	},
);

Body.displayName = 'CardBody';

const Footer = forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles.footer, className)} {...props}>
				{children}
			</div>
		);
	},
);

Footer.displayName = 'CardFooter';

// Export components
export { Root, Header, Body, Footer };
