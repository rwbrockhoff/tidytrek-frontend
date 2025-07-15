import { forwardRef } from 'react';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { cn } from '@/styles/utils';
import styles from './popover-menu.module.css';

type PopoverMenuItemProps = {
	label: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	className?: string;
	'aria-label'?: string;
	'aria-describedby'?: string;
};

export const PopoverMenuItem = forwardRef<HTMLButtonElement, PopoverMenuItemProps>(
	({
		label,
		icon,
		onClick,
		className,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedBy,
	}, ref) => {
		return (
			<Button
				ref={ref}
				variant="ghost"
				onClick={onClick}
				className={cn(styles.menuButton, className)}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedBy}>
				<Flex className="items-center gap-2 justify-start">
					{icon && icon}
					{label}
				</Flex>
			</Button>
		);
	}
);

PopoverMenuItem.displayName = 'PopoverMenuItem';