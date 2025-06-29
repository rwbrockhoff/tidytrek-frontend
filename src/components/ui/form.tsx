import { TextAreaEvent, type FormError, type InputEvent } from '@/types/form-types';
import { type RadixInputType } from '@/types/radix-types';
import {
	FormField as RadixFormField,
	FormControl,
	FormMessage,
	FormLabel,
} from '@radix-ui/react-form';
import { TextField, Text, TextArea, Flex, Box } from '@radix-ui/themes';
import styles from './form.module.css';

type FormFieldProps = {
	value?: string;
	error?: FormError;
	name: string;
	placeholder: string;
	type?: RadixInputType;
	label?: string;
	size?: '1' | '2' | '3' | undefined;
	width?: string;
	tooltip?: React.ReactNode;
	icon?: React.ReactNode;
	onChange?: (e: InputEvent) => void;
};

export const FormField = (props: FormFieldProps) => {
	const {
		value,
		name,
		placeholder,
		type = 'text',
		size = '3',
		width = '100%',
		label,
		error,
		tooltip,
		icon,
		onChange,
	} = props;
	const hasLabel = label !== undefined || '';

	return (
		<RadixFormField name={name} style={{ width, textAlign: 'left' }}>
			{hasLabel && (
				<FormLabel>
					<Text size="2" weight="bold" ml="1" color="gray">
						{label}
						{tooltip}
					</Text>
				</FormLabel>
			)}
			<Box position="relative">
				<FormControl asChild>
					<TextField.Root
						value={value}
						data-invalid={error?.error}
						onChange={onChange}
						type={type}
						placeholder={placeholder}
						size={size}
					/>
				</FormControl>
				{icon && (
					<Flex align="center" className={styles.iconContainer}>
						{icon}
					</Flex>
				)}
			</Box>

			{error?.error && (
				<FormMessage>
					<Text mb="4" color="tomato" weight="light">
						{error.message}
					</Text>
				</FormMessage>
			)}
		</RadixFormField>
	);
};

type FormTextAreaProps = {
	name: string;
	value?: string;
	label?: string;
	placeholder: string;
	error?: FormError;
	maxLength?: number;
	onChange?: (e: TextAreaEvent) => void;
};

export const FormTextArea = (props: FormTextAreaProps) => {
	const { name, value, label, placeholder, maxLength = 500, error } = props;
	const { onChange } = props;

	return (
		<RadixFormField name={name}>
			<FormLabel>
				<Text size="2" weight="bold" ml="2" color="gray">
					{label}
				</Text>
			</FormLabel>

			<TextArea
				name={name}
				value={value}
				variant="surface"
				size="3"
				mb="3"
				maxLength={maxLength}
				placeholder={placeholder}
				onChange={onChange}
			/>

			{error?.error && (
				<FormMessage>
					<Text mb="4" color="tomato" weight="light">
						{error.message}
					</Text>
				</FormMessage>
			)}
		</RadixFormField>
	);
};
