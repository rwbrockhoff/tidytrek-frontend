import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, FormField, FormControl, FormMessage } from '@radix-ui/react-form';
import { Segment, Message } from '@/components/ui';
import { Heading, Button, Text, Flex, TextField } from '@radix-ui/themes';
import { FormContainer } from './form-components';
import { GoogleAuth } from './google-auth';
import { FormErrors } from '../types/auth-types';
import { LoginUserFormData, RegisterUserFormData } from '@/types/user-types';
import { type FormEvent } from 'react';
import { FormError, type InputEvent } from '@/types/form-types';

type FormProps = {
	isRegisterForm: boolean;
	isRegisterSuccess: boolean;
	isLoading: boolean;
	formErrors: FormErrors;
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

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		if (isRegisterForm) registerUser(data as RegisterUserFormData);
		else loginUser(data as LoginUserFormData);
	};

	const handleClearErrors = (e: InputEvent) => {
		if (formErrors[e.target.name].error) resetFormErrors(e.target.name);
		if (serverError.error) resetFormErrors();
	};

	return (
		<FormContainer>
			<Heading as="h1" mb="4">
				tidytrek
			</Heading>
			<Segment $radius="2">
				<Heading as="h3" size="6" color="jade" mb="4">
					{isRegisterForm ? 'Create your account' : 'Log in to your account'}
				</Heading>

				<GoogleAuth
					context={isRegisterForm ? 'signup' : 'signin'}
					updateServerError={updateServerError}
				/>

				<DividerText>or</DividerText>

				<Form onSubmit={handleFormSubmit}>
					{isRegisterForm && (
						<>
							<FormField name="firstName">
								<FormControl asChild>
									<TextField.Input
										data-invalid={formErrors.firstName.error}
										onChange={handleClearErrors}
										radius="small"
										my="4"
										size="3"
										placeholder="First Name"
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
										data-invalid={formErrors.lastName.error}
										onChange={handleClearErrors}
										radius="small"
										my="4"
										size="3"
										placeholder="Last Name"
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

const DividerText = styled.p`
	margin: 1em 0em;
	opacity: 0.8;
	font-size: 1.1rem;
`;
