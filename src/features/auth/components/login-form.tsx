import { useRef, useEffect, type FormEvent } from 'react';
import { type FormError, type InputEvent } from '@/types/form-types';
import { Link } from 'react-router-dom';
import { Form, FormField, FormControl, FormMessage } from '@radix-ui/react-form';
import { Segment, Message } from '@/components/ui';
import { Heading, Button, Text, Flex, TextField, Box } from '@radix-ui/themes';
import { FormContainer } from './form-components';
import styles from './form-components.module.css';
import { GoogleAuth } from './google-auth';
import { LoginUserFormData, RegisterUserFormData } from '@/types/user-types';
import { clearZodErrors, type ZodFormErrors } from '@/hooks';

type FormProps = {
	isRegisterForm: boolean;
	isRegisterSuccess: boolean;
	isLoading: boolean;
	formErrors: ZodFormErrors<RegisterUserFormData>;
	serverError: FormError;
	registerUser: (formData: RegisterUserFormData) => void;
	loginUser: (formData: LoginUserFormData) => void;
	resetFormErrors: (inputName?: string) => void;
	updateServerError: (message: string) => void;
};

export const LogInForm = (props: FormProps) => {
	const { isRegisterForm, isRegisterSuccess, isLoading } = props;
	const { registerUser, loginUser, resetFormErrors, updateServerError } = props;
	const { formErrors, serverError } = props;

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		if (isRegisterForm) registerUser(data as RegisterUserFormData);
		else loginUser(data as LoginUserFormData);
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors(e, formErrors, resetFormErrors);
		if (serverError.error) resetFormErrors();
	};

	useEffect(() => {
		if (isRegisterSuccess) {
			formRef?.current?.reset();
		}
	}, [isRegisterSuccess]);

	return (
		<FormContainer>
			<Heading as="h1" size="8" mb="6" className={styles.brandHeading}>
				<Link to="/">tidytrek</Link>
			</Heading>
			<Segment radius="2">
				<Heading as="h3" size="7" mb="6">
					{isRegisterForm ? 'Create your account' : 'Log in to your account'}
				</Heading>

				<GoogleAuth
					context={isRegisterForm ? 'signup' : 'signin'}
					updateServerError={updateServerError}
				/>

				<Text>or</Text>

				<Box px="4">
					<Form ref={formRef} onSubmit={handleFormSubmit}>
						{isRegisterForm && (
							<>
								<FormField name="firstName">
									<FormControl asChild>
										<TextField.Input
											placeholder="First Name"
											onChange={handleClearErrors}
											radius="small"
											my="4"
											size="3"
											data-invalid={formErrors.firstName.error}
											data-testid="first-name-input"
										/>
									</FormControl>
									{formErrors.firstName.error && (
										<FormMessage>
											<Text mb="8" color="tomato" weight="light">
												{formErrors.firstName.message}
											</Text>
										</FormMessage>
									)}
								</FormField>
								<FormField name="lastName">
									<FormControl asChild>
										<TextField.Input
											placeholder="Last Name"
											onChange={handleClearErrors}
											radius="small"
											my="4"
											size="3"
											data-invalid={formErrors.lastName.error}
											data-testid="last-name-input"
										/>
									</FormControl>
									{formErrors.lastName.error && (
										<FormMessage>
											<Text mb="8" color="tomato" weight="light">
												{formErrors.lastName.message}
											</Text>
										</FormMessage>
									)}
								</FormField>
							</>
						)}

						<FormField name="email">
							<FormControl asChild>
								<TextField.Input
									placeholder="Email"
									onChange={handleClearErrors}
									radius="small"
									my="4"
									size="3"
									data-invalid={formErrors.email.error}
									data-testid="email-input"
									style={{ boxSizing: 'border-box' }}
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
									<Text
										mb="8"
										color="tomato"
										weight="light"
										aria-label="error warning"
										role="alert"
										aria-invalid={formErrors.password.error ? 'true' : 'false'}
										aria-errormessage={
											formErrors.password.error ? formErrors.password.message : ''
										}
										data-testid="auth-message-error">
										{formErrors.password.message}
									</Text>
								</FormMessage>
							)}
						</FormField>

						{serverError.error && (
							<Message
								messageType="error"
								text={serverError.message || 'Oops! There was an error.'}
								id="auth-message"
							/>
						)}

						{isRegisterSuccess && (
							<Message
								messageType="success"
								text="Check your email for a link to sign in."
								id="auth-message"
							/>
						)}
						<Button
							type="submit"
							style={{ width: '100%' }}
							size="3"
							my="4"
							disabled={isLoading}>
							{isRegisterForm ? 'Create account' : 'Login'}
						</Button>
					</Form>
				</Box>

				{isRegisterForm && (
					<Flex direction="column">
						<Text color="gray" size="2" my="4">
							By clicking "Create account" or "Continue with Google", you agree to the
							Tidytrek Terms of Service and Privacy Policy.
						</Text>

						<Text size="3" color="gray">
							Already have an account? <Link to={'/'}>Log In</Link>
						</Text>
					</Flex>
				)}

				{!isRegisterForm && (
					<Text size="3" mt="4">
						<Link to={'/register'}>Sign Up</Link> |{' '}
						<Link to={'/reset-password'}>Forgot Your Password</Link>
					</Text>
				)}
			</Segment>
		</FormContainer>
	);
};
