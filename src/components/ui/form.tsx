import { TextAreaEvent, type FormError, type InputEvent } from '@/types/form-types';
import {
	FormField as RadixFormField,
	FormControl,
	FormMessage,
	FormLabel,
} from '@radix-ui/react-form';
import { TextFieldInput, Text, TextArea, type Responsive } from '@radix-ui/themes';

type FormFieldProps = {
	value?: string;
	error?: FormError;
	name: string;
	placeholder: string;
	type?: string;
	label?: string;
	size?: Responsive<'3' | '1' | '2'> | undefined;
	width?: string;
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
		onChange,
	} = props;
	const hasLabel = label !== undefined || '';

	return (
		<RadixFormField name={name} style={{ width }}>
			{hasLabel && (
				<FormLabel>
					<Text size="2" weight="bold" ml="1" color="gray">
						{label}
					</Text>
				</FormLabel>
			)}
			<FormControl asChild>
				<TextFieldInput
					value={value}
					data-invalid={error?.error}
					onChange={onChange}
					radius="small"
					mb="3"
					size={size}
					type={type}
					placeholder={placeholder}
				/>
			</FormControl>
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
