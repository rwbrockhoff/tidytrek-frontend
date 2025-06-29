import { TextAreaEvent, type FormError } from '@/types/form-types';
import {
	FormField as RadixFormField,
	FormMessage,
	FormLabel,
} from '@radix-ui/react-form';
import { Text, TextArea } from '@radix-ui/themes';

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
