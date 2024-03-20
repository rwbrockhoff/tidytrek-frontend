import { type FormError, type InputEvent } from '@/types/form-types';
import {
	FormField as RadixFormField,
	FormControl,
	FormMessage,
	FormLabel,
} from '@radix-ui/react-form';
import { TextFieldInput, Text } from '@radix-ui/themes';

type FormFieldProps = {
	value?: string;
	error?: FormError;
	name: string;
	placeholder: string;
	type?: string;
	label?: string;
	onChange?: (e: InputEvent) => void;
};

export const FormField = (props: FormFieldProps) => {
	const { value, name, placeholder, type = 'text', label, error, onChange } = props;
	const hasLabel = label !== undefined || '';

	return (
		<RadixFormField name={name}>
			{hasLabel && (
				<FormLabel>
					<Text size="2" weight="bold" ml="2" color="gray">
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
					size="3"
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
