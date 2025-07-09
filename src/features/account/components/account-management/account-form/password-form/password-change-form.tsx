import { useRef, type FormEvent } from 'react';
import {
	type InputEvent,
	type TextAreaEvent,
	type PasswordInfo,
} from '@/types/form-types';
import styles from './password-form.module.css';
import mx from '@/styles/utils/mixins.module.css';
import { Flex, Button } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import { TextField } from '@/components/ui/alpine/';
import { Message } from '@/components/ui';
import { z, passwordSchema } from '@/schemas';
import { useZodError, clearZodErrors } from '@/hooks';
import { usePasswordActions } from '@/features/account/hooks';

type PasswordChangeFormProps = {
	onFormSuccess: () => void;
	onCancel: () => void;
	isFormSuccess: boolean;
};

type ZodInputs = {
	password: string;
	confirmPassword: string;
	emailCode: string;
};

const changePasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
		emailCode: z.string().min(6, { message: 'Invalid confirmation code.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

const supabaseErrorMessage =
	'There was an error updating your password. You might need to try again.';

const successMessage = 'Your password was changed successfully.';

export const PasswordChangeForm = ({
	onFormSuccess,
	onCancel,
	isFormSuccess,
}: PasswordChangeFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const { changePassword } = usePasswordActions();

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<ZodInputs>([
		'password',
		'confirmPassword',
		'emailCode',
	]);

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget)) as PasswordInfo;
		const schemaData = changePasswordSchema.safeParse(data);

		if (!schemaData.success) {
			const errorList = JSON.parse(schemaData.error.message);
			return updateFormErrors(errorList);
		}

		const { password, emailCode } = data;
		changePassword.mutate(
			{ password, emailCode },
			{
				onSuccess: () => {
					formRef?.current && formRef.current.reset();
					onFormSuccess();
				},
			},
		);
	};

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		clearZodErrors<ZodInputs>(e, formErrors, resetFormErrors);
	};

	return (
		<Form className={mx.halfWidth} ref={formRef} onSubmit={handleSubmitForm}>
			<TextField.Input
				name="password"
				label="New Password"
				error={formErrors.password}
				onChange={handleClearErrors}
				type="password"
				placeholder="New Password"
			/>

			<TextField.Input
				name="confirmPassword"
				label="Confirm Password"
				error={formErrors.confirmPassword}
				onChange={handleClearErrors}
				type="password"
				placeholder="Confirm Password"
			/>

			<TextField.Input
				name="emailCode"
				label="Email Code"
				error={formErrors.emailCode}
				onChange={handleClearErrors}
				placeholder="Email Code"
			/>

			{changePassword.isError && (
				<Message messageType="error" text={supabaseErrorMessage} />
			)}

			{isFormSuccess && <Message messageType="success" text={successMessage} />}

			<Flex justify="end" gap="3" mt="3" className={styles.buttonContainer}>
				<Button variant="outline" color="gray" onClick={onCancel}>
					{isFormSuccess ? 'Close' : 'Cancel'}
				</Button>
				<Button type="submit" disabled={changePassword.isPending}>
					{changePassword.isPending ? 'Saving...' : 'Save Password'}
				</Button>
			</Flex>
		</Form>
	);
};
