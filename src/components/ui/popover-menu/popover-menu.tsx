import { Popover } from '@radix-ui/themes';
import { Stack } from '@/components/layout';

type PopoverMenuProps = {
	trigger: React.ReactNode;
	children: React.ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	size?: '1' | '2' | '3' | '4';
	sideOffset?: number;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const PopoverMenu = ({
	trigger,
	children,
	side = 'bottom',
	size = '1',
	sideOffset = 0,
	open,
	onOpenChange,
}: PopoverMenuProps) => {
	return (
		<Popover.Root open={open} onOpenChange={onOpenChange}>
			<Popover.Trigger>{trigger}</Popover.Trigger>
			<Popover.Content side={side} size={size} sideOffset={sideOffset}>
				<Stack className="gap-1">
					{children}
				</Stack>
			</Popover.Content>
		</Popover.Root>
	);
};