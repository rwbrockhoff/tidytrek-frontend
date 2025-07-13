import { type FormEvent } from 'react';
import { Form } from '@radix-ui/react-form';
import { Flex, Text } from '@radix-ui/themes';
import { Button, TextField } from '@/components/alpine';
import { RefreshIcon } from '@/components/icons';
import { Message } from '@/components/ui';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { type FormError } from '@/types/form-types';

type FormData = {
	username: string;
	trailName: string;
};

type WelcomeFormFieldsProps = {
	formData: FormData;
	isPending: boolean;
	serverError: FormError;
	formErrors: ZodFormErrors<FormData>;
	onInput: (e: InputEvent) => void;
	onGenerateUsername: () => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const WelcomeFormFields = ({
	formData,
	isPending,
	serverError,
	formErrors,
	onInput,
	onGenerateUsername,
	onSubmit,
}: WelcomeFormFieldsProps) => {
	return (
		<Form onSubmit={onSubmit}>
			<TextField.Input
				name="username"
				label="Username"
				value={formData.username}
				onChange={onInput}
				placeholder="Username"
				error={formErrors.username}
				variant="icon"
				iconPosition="right"
				iconIsButton={true}
				icon={
					<Button
						size="sm"
						type="button"
						onClick={onGenerateUsername}
						aria-label="Generate random username"
						iconLeft={<RefreshIcon />}
					/>
				}
			/>

			<TextField.Input
				name="trailName"
				label="Trail Name"
				value={formData.trailName}
				onChange={onInput}
				placeholder="Trail Name"
				error={formErrors.trailName}
			/>

			{serverError.error && (
				<Message
					messageType="error"
					text={serverError.message || 'Oops! There was an error.'}
				/>
			)}

			<Flex mt="4" justify="center" direction="column" gap="4">
				<Button type="submit" style={{ width: '100%' }} loading={isPending}>
					Continue
				</Button>
				<Text size="2" align="center" color="gray">
					You can always change this later in your account settings.
				</Text>
			</Flex>
		</Form>
	);
};