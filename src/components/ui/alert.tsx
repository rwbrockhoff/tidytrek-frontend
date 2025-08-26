import { Alert as AlpineAlert } from '@/components/alpine';
import { cn } from '@/styles/utils';
import type { ComponentProps } from 'react';

type AlertProps = ComponentProps<typeof AlpineAlert>;

export const Alert = ({ className, size = 'sm', ...props }: AlertProps) => {
	return (
		<AlpineAlert
			className={cn(
				'w-full md:max-w-[400px]',
				className
			)}
			size={size}
			{...props}
		/>
	);
};