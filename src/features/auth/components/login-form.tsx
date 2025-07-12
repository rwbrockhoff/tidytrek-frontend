import { useRef, useEffect, type FormEvent } from 'react';
import { type FormError, type InputEvent } from '@/types/form-types';
import { Link as RouterLink } from 'react-router-dom';
import { Form } from '@radix-ui/react-form';
import { LandingLink } from '@/components/ui';
import { Segment, Message } from '@/components/ui';
import { Heading, Text, Flex, Box } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { TextField } from '@/components/ui/alpine';
import { FormContainer } from './form-components/form-components';
import styles from './form-components/form-components.module.css';
import { GoogleAuth } from './google-auth';
import { LoginUserFormData, RegisterUserFormData } from '@/types/user-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

export type AuthFormProps = {
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

export const LogInForm = (props: AuthFormProps) => {
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

	// Clear form on route change
	useEffect(() => {
		formRef?.current?.reset();
	}, [isRegisterForm]);

	return (
		<FormContainer>
			<Heading as="h1" size="8" mb="6" className={styles.brandHeading}>
				<LandingLink>tidytrek</LandingLink>
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
								<TextField.Input
									name="firstName"
									placeholder="First Name"
									aria-label="First Name"
									onChange={handleClearErrors}
									error={formErrors.firstName}
									data-testid="first-name-input"
								/>
								<TextField.Input
									name="lastName"
									placeholder="Last Name"
									aria-label="Last Name"
									onChange={handleClearErrors}
									error={formErrors.lastName}
									data-testid="last-name-input"
								/>
							</>
						)}

						<TextField.Input
							name="email"
							placeholder="Email"
							aria-label="Email"
							onChange={handleClearErrors}
							error={formErrors.email}
							data-testid="email-input"
						/>

						<TextField.Input
							name="password"
							placeholder="Password"
							aria-label="Password"
							onChange={handleClearErrors}
							error={formErrors.password}
							type="password"
							data-testid="password-input"
						/>

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
						<Button type="submit" style={{ width: '100%' }} size="md" loading={isLoading}>
							{isRegisterForm ? 'Create account' : 'Login'}
						</Button>
					</Form>
				</Box>

				{isRegisterForm && (
					<Flex direction="column" mt="4">
						<Text color="gray" size="1" my="4">
							By clicking "Create account" or "Continue with Google", you agree to the
							Tidytrek <LandingLink to="terms-of-service">Terms of Service</LandingLink>{' '}
							and <LandingLink to="privacy-policy">Privacy Policy</LandingLink>.
						</Text>

						<Text size="3" color="gray">
							Already have an account? <RouterLink to={'/'}>Log In</RouterLink>
						</Text>
					</Flex>
				)}

				{!isRegisterForm && (
					<Text size="3" mt="4">
						<RouterLink to={'/register'}>Sign Up</RouterLink> |{' '}
						<RouterLink to={'/reset-password'}>Forgot Your Password</RouterLink>
					</Text>
				)}
			</Segment>
		</FormContainer>
	);
};
