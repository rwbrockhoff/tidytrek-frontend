import { type FormError, type InputEvent } from '@/types/form-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { Form } from '@radix-ui/react-form';
import { Message, Segment } from '@/components/ui';
import { Flex, Text, Heading } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { TextField } from '@/components/ui/alpine';
import { Link } from 'react-router-dom';
import { FormContainer, AuthContainer } from '../form-components/form-components';
import styles from '../form-components/form-components.module.css';
import { type FormEvent } from 'react';
import { type ResetPasswordData } from '../../types/auth-types';

type ResetPasswordFormProps = {
	hasResetToken: boolean;
	emailSent: boolean;
	formErrors: ZodFormErrors<ResetPasswordData>;
	serverError: FormError;
	onResetRequest: (formData: ResetPasswordData) => void;
	onResetConfirm: (formData: ResetPasswordData) => void;
	resetFormErrors: (inputName?: string) => void;
};

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
	const { emailSent, hasResetToken, formErrors, serverError } = props;
	const { onResetRequest, onResetConfirm, resetFormErrors } = props;

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget)) as ResetPasswordData;
		hasResetToken ? onResetConfirm(data) : onResetRequest(data);
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors(e, formErrors, resetFormErrors);
		if (serverError.error) resetFormErrors();
	};

	return (
		<AuthContainer>
			<FormContainer>
				<Heading as="h1" size="8" mb="6" className={styles.brandHeading}>
					<Link to="/">tidytrek</Link>
				</Heading>

				<Segment radius="2">
					<Heading as="h3" size="6" mb="5">
						Reset Password
					</Heading>
					<Form onSubmit={handleFormSubmit}>
						{!hasResetToken && (
							<TextField.Input
								name="email"
								error={formErrors.email}
								onChange={handleClearErrors}
								placeholder="Email"
								aria-label="Email"
							/>
						)}

						{hasResetToken && (
							<>
								<TextField.Input
									name="password"
									error={formErrors.password}
									onChange={handleClearErrors}
									type="password"
									placeholder="Password"
									aria-label="Password"
									data-testid="password-input"
								/>

								<TextField.Input
									name="confirmPassword"
									error={formErrors.confirmPassword}
									onChange={handleClearErrors}
									type="password"
									placeholder="Confirm Password"
									aria-label="Confirm Password"
									data-testid="confirm-password-input"
								/>
							</>
						)}

						{serverError.error && (
							<Message
								messageType="error"
								id="reset-password-message"
								text={serverError.message}
							/>
						)}

						<Button style={{ width: '100%' }} type="submit">
							{hasResetToken ? 'Confirm New Password' : 'Reset Password'}
						</Button>
					</Form>

					{emailSent && (
						<Message
							messageType="success"
							text={resetInstructionMessage}
							id="reset-password-message"
						/>
					)}
					<Flex justify="center" mt="4">
						<Text size="3">
							<Link to={'/'}>Log In</Link> | <Link to={'/register'}>Sign Up</Link>
						</Text>
					</Flex>
				</Segment>
			</FormContainer>
		</AuthContainer>
	);
};

// defaults
const resetInstructionMessage =
	'If you have an account on Tidytrek, you will receive an email with a link to reset your password. Be sure to check your spam folder too.';
