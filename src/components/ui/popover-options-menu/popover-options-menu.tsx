import { Popover } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { cn } from '@/styles/utils';
import styles from './popover-options-menu.module.css';

export type PopoverOptionItem = {
	icon?: React.ReactNode;
	label: string;
	onClick: () => void;
	variant?: 'default' | 'primary' | 'danger';
};

type PopoverOptionsMenuProps = {
	trigger: React.ReactNode;
	items: PopoverOptionItem[];
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	buttonAlignment?: 'left' | 'center' | 'right';
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const PopoverOptionsMenu = ({
	trigger,
	items,
	side = 'bottom',
	align = 'center',
	sideOffset = 0,
	buttonAlignment = 'left',
	open,
	onOpenChange,
}: PopoverOptionsMenuProps) => {
	const alignmentClass = 
		buttonAlignment === 'center' ? styles.alignCenter :
		buttonAlignment === 'right' ? styles.alignRight :
		styles.alignLeft;

	return (
		<Popover.Root open={open} onOpenChange={onOpenChange}>
			<Popover.Trigger>{trigger}</Popover.Trigger>
			<Popover.Content side={side} align={align} size="1" sideOffset={sideOffset}>
				<div className={cn("flex flex-col gap-1", alignmentClass)}>
					{items.map((item, index) => {
						const variantClass = 
							item.variant === 'primary' ? styles.primary :
							item.variant === 'danger' ? styles.danger :
							'';

						return (
							<div key={index} className={variantClass}>
								<Button
									variant="ghost"
									size="sm"
									override
									iconLeft={item.icon}
									onClick={item.onClick}
									className="text-sm">
									{item.label}
								</Button>
							</div>
						);
					})}
				</div>
			</Popover.Content>
		</Popover.Root>
	);
};
