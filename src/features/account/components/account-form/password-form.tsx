import { useRef, type FormEvent } from 'react';
import { FormSection } from '../../types/account-types';
import { InputEvent, TextAreaEvent, type PasswordInfo } from '@/types/form-types';
import { useState } from 'react';
import styled from 'styled-components';
import { Flex, Heading, Button, Text } from '@radix-ui/themes';
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from '@radix-ui/react-form';
import { TextFieldInput } from '@radix-ui/themes';
import { Link, Message, PasswordIcon } from '@/components/ui';
import { ConfirmationForm } from './confirmation-form';
import { reauthenticateUser, updatePassword } from '@/api/supabaseClient';
import { z, passwordSchema } from '@/schemas';
import { useZodError } from '@/hooks';

type PasswordFormProps = {
	displayFormSection: FormSection;
	changeFormSection: (section: FormSection) => void;
};

export const PasswordForm = (props: PasswordFormProps) => {
	const { displayFormSection, changeFormSection } = props;

	const formRef = useRef<HTMLFormElement | null>(null);
	const [confirmationSent, setConfirmationSent] = useState(false);
	const [formSuccess, setFormSuccess] = useState(false);

	const [serverError, setServerError] = useState({ error: false, message: '' });
	const { formErrors, updateFormErrors, resetFormErrors } = useZodError([
		'password',
		'confirmPassword',
		'emailCode',
	]);

	const handleSendConfirmation = async () => {
		try {
			changeFormSection('passwordForm');
			const { error } = await reauthenticateUser();
			if (!error) setConfirmationSent(true);
		} catch (err) {
			setServerError({ error: true, message: confirmationErrorMessage });
		}
	};

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validate form
		const data = Object.fromEntries(new FormData(e.currentTarget)) as PasswordInfo;
		const schemaData = changePasswordSchema.safeParse(data);
		if (!schemaData.success) {
			const errorList = JSON.parse(schemaData.error.message);
			return updateFormErrors(errorList);
		}
		// send request to supabase
		const { password, emailCode } = data;
		const { error } = await updatePassword(password, emailCode);
		// handle supabase error
		if (error) return setServerError({ error: true, message: supabaseErrorMessage });
		// handle success
		else {
			formRef?.current && formRef.current.reset();
			setFormSuccess(true);
		}
	};

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		const hasError = formErrors[e.target.name]?.error;
		if (hasError) resetFormErrors(e.target.name);
		if (serverError.error) setServerError({ error: false, message: '' });
	};

	const handleCloseForm = () => {
		// reset form state
		changeFormSection('initial');
		setFormSuccess(false);
		setServerError({ error: false, message: '' });
		formRef?.current && formRef.current.reset();
	};

	// show confirmation form when the section is chosen,
	// or to show 'email sent' message when passwordForm is visible
	const showConfirmationForm =
		(!formSuccess && displayFormSection === 'confirmationForm') ||
		(displayFormSection === 'passwordForm' && confirmationSent && !formSuccess);

	return (
		<>
			<Heading as="h4" size="3" mb="4">
				Update Your Password
			</Heading>
			{displayFormSection === 'initial' && (
				<Button
					variant="outline"
					color="gray"
					onClick={() => changeFormSection('confirmationForm')}>
					<PasswordIcon />
					Change Password
				</Button>
			)}

			{showConfirmationForm && (
				<ConfirmationForm
					sendConfirmation={handleSendConfirmation}
					confirmationSent={confirmationSent}
				/>
			)}

			{displayFormSection === 'passwordForm' && (
				<Form style={{ width: '50%' }} ref={formRef} onSubmit={handleSubmitForm}>
					<FormField name="password">
						<FormLabel>New Password</FormLabel>
						<FormControl asChild>
							<TextFieldInput
								data-invalid={formErrors.password.error}
								onChange={handleClearErrors}
								radius="small"
								mt="1"
								mb="2"
								size="3"
								type="password"
								placeholder="New Password"
							/>
						</FormControl>
						{formErrors.password.error && (
							<FormMessage>
								<Text mb="8" color="tomato" weight="light">
									{formErrors.password.message}
								</Text>
							</FormMessage>
						)}
					</FormField>

					<FormField name="confirmPassword">
						<FormLabel>Confirm Password</FormLabel>
						<FormControl asChild>
							<TextFieldInput
								data-invalid={formErrors.confirmPassword.error}
								onChange={handleClearErrors}
								radius="small"
								mt="1"
								mb="2"
								size="3"
								type="password"
								placeholder="New Password"
							/>
						</FormControl>
						{formErrors.confirmPassword.error && (
							<FormMessage>
								<Text mb="8" color="tomato" weight="light">
									{formErrors.confirmPassword.message}
								</Text>
							</FormMessage>
						)}
					</FormField>

					<FormField name="emailCode">
						<FormLabel>Email Code</FormLabel>
						<FormControl asChild>
							<TextFieldInput
								data-invalid={formErrors.emailCode.error}
								onChange={handleClearErrors}
								radius="small"
								my="2"
								size="3"
								placeholder="Email Code"
							/>
						</FormControl>
						{formErrors.emailCode.error && (
							<FormMessage>
								<Text mb="8" color="tomato" weight="light">
									{formErrors.emailCode.message}
								</Text>
							</FormMessage>
						)}
					</FormField>

					<Link link="/reset-password">
						<p>Reset Your Password</p>
					</Link>

					{serverError.error && (
						<Message messageType="error" text={serverError.message} />
					)}

					{formSuccess && <Message messageType="success" text={successMessage} />}

					<ButtonContainer justify="end" gap="3">
						<Button variant="outline" color="gray" onClick={handleCloseForm}>
							{formSuccess ? 'Close' : 'Cancel'}
						</Button>
						<Button type="submit">Save Password</Button>
					</ButtonContainer>
				</Form>
			)}
		</>
	);
};

const ButtonContainer = styled(Flex)`
	${({ theme: t }) =>
		t.mx.mobile(`
		width: 100%;
		margin-top: 2em;
	`)}
`;

// schemas
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

// defaults
const supabaseErrorMessage =
	'There was an error updating your password. You might need to try again.';

const confirmationErrorMessage =
	'There was an error sending a confirmation code. Please try again later.';

const successMessage = 'Your password was changed successfully.';
