import { TextField } from '@radix-ui/themes';
import { cn } from '@/styles/utils';

type TableInputProps = {
	value?: string;
	placeholder?: string;
	name?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	className?: string;
};

export const TableInput = ({
	value,
	placeholder,
	name,
	onChange,
	onBlur,
	disabled = false,
	className,
}: TableInputProps) => {
	return (
		<TextField.Input
			value={value || ''}
			placeholder={!disabled ? placeholder : ''}
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			disabled={disabled}
			className={cn('input-minimal', className)}
		/>
	);
};
