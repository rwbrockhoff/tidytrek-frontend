import { type FormError, type InputEvent } from '@/types/form-types';
import { clearZodErrors, type ZodFormErrors } from '@/hooks';
import { Form, FormField, FormControl, FormMessage } from '@radix-ui/react-form';
import { Message, Segment } from '@/components/ui';
import { Flex, Text, Heading, Button, TextField } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { FormContainer, AuthContainer } from '../form-components';
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
				<Heading as="h1" size="8" mb="6" style={{ letterSpacing: '-0.5px' }}>
					tidytrek
				</Heading>

				<Segment radius="2">
					<Heading as="h3" size="6" color="jade" mb="4">
						Reset Password
					</Heading>
					<Form onSubmit={handleFormSubmit}>
						{!hasResetToken && (
							<FormField name="email">
								<FormControl asChild>
									<TextField.Input
										data-invalid={formErrors.email.error}
										onChange={handleClearErrors}
										radius="small"
										my="4"
										size="3"
										placeholder="Email"
									/>
								</FormControl>
								{formErrors.email.error && (
									<FormMessage>
										<Text mb="8" color="tomato" weight="light">
											{formErrors.email.message}
										</Text>
									</FormMessage>
								)}
							</FormField>
						)}

						{hasResetToken && (
							<>
								<FormField name="password">
									<FormControl asChild>
										<TextField.Input
											data-invalid={formErrors.password.error}
											onChange={handleClearErrors}
											radius="small"
											my="4"
											size="3"
											type="password"
											placeholder="Password"
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
									<FormControl asChild>
										<TextField.Input
											data-invalid={formErrors.confirmPassword.error}
											onChange={handleClearErrors}
											radius="small"
											my="4"
											size="3"
											type="password"
											placeholder="Confirm Password"
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
							</>
						)}

						{serverError.error && (
							<Message messageType="error" text={serverError.message} />
						)}

						<Button size="3" mt="2" style={{ width: '100%' }} type="submit">
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
