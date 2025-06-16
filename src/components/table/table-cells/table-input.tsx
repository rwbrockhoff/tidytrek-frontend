import { TextField } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import styles from './table-input.module.css';

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
	className 
}: TableInputProps) => {
	return (
		<TextField.Input
			value={value || ''}
			placeholder={placeholder}
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			disabled={disabled}
			className={cn(styles.tableInput, disabled && styles.disabled, className)}
		/>
	);
};
