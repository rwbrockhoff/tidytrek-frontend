import { type FormError, type InputEvent } from '@/types/form-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { Form } from '@radix-ui/react-form';
import { Message } from '@/components/ui';
import { Segment } from '@/components/primitives';
import { Flex } from '@/components/layout';
import { Text, Heading } from '@radix-ui/themes';
import { Button, TextField } from '@/components/alpine';
import { Logo } from '@/layout/logo';
import { Link } from 'react-router-dom';
import { FormContainer, AuthContainer } from '../form-components/form-components';
import styles from '../form-components/form-components.module.css';
import { type FormEvent } from 'react';
import { type ResetPasswordData } from '../../types/auth-types';

type ResetPasswordFormProps = {
	hasResetToken: boolean;
	emailSent: boolean;
	isLoading: boolean;
	formErrors: ZodFormErrors<ResetPasswordData>;
	serverError: FormError;
	onResetRequest: (formData: ResetPasswordData) => void;
	onResetConfirm: (formData: ResetPasswordData) => void;
	resetFormErrors: (inputName?: string) => void;
};

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
	const { emailSent, hasResetToken, isLoading, formErrors, serverError } = props;
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
				<Heading as="h1" size="8" className={styles.brandHeading}>
					<Link to="/" viewTransition>
						<Logo className="mx-auto mb-4" />
					</Link>
				</Heading>

				<Segment radius="2">
					<Heading as="h3" size="6" mb="5" className={styles.authTitle}>
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

						<Button style={{ width: '100%' }} type="submit" loading={isLoading}>
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
					<Flex className="justify-center mt-4">
						<Text size="3">
							<Link to={'/'} viewTransition>
								Log In
							</Link>{' '}
							|{' '}
							<Link to={'/register'} viewTransition>
								Sign Up
							</Link>
						</Text>
					</Flex>
				</Segment>
			</FormContainer>
		</AuthContainer>
	);
};

// defaults
const resetInstructionMessage =
	'Check your email for a password reset link. Don\'t forget to check spam.';
