import { type InputEvent } from '@/types/form-types';
import { type RegisterUserFormData } from '@/types/user-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { Segment, Message } from '@/components/ui';
import { Heading, Button, Text, Flex } from '@radix-ui/themes';
import { FormContainer } from './form-components';
import { FormError } from '@/types/form-types';
import { RegisterFormSection } from './register-form-section';
import { GoogleAuth } from './google-auth';

type FormProps = {
	formData: RegisterUserFormData;
	isRegisterForm: boolean;
	isRegisterSuccess: boolean;
	isLoading: boolean;
	formError: FormError;
	invalidForm: (message: string) => void;
	onFormChange: (e: InputEvent) => void;
	onSubmit: () => void;
};

export const LogInForm = ({
	formData,
	isRegisterForm,
	isRegisterSuccess,
	isLoading,
	formError,
	invalidForm,
	onFormChange,
	onSubmit,
}: FormProps) => {
	return (
		<FormContainer>
			<Heading as="h1" mb="4">
				tidytrek
			</Heading>
			<Form size="large">
				<Segment $radius="2">
					<Heading as="h3" size="6" color="jade" mb="4">
						{isRegisterForm ? 'Create your account' : 'Log in to your account'}
					</Heading>

					<GoogleAuth
						context={isRegisterForm ? 'signup' : 'signin'}
						invalidForm={invalidForm}
					/>

					<DividerText>or</DividerText>

					{isRegisterForm && (
						<RegisterFormSection formData={formData} onFormChange={onFormChange} />
					)}

					<Form.Input
						fluid
						icon="at"
						type="email"
						iconPosition="left"
						placeholder="E-mail address"
						name="email"
						value={formData.email}
						data-testid="email-input"
						onChange={onFormChange}
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						placeholder="Password"
						type="password"
						name="password"
						value={formData.password}
						data-testid="password-input"
						onChange={onFormChange}
					/>

					<Button
						style={{ width: '100%' }}
						size="3"
						mb="4"
						onClick={onSubmit}
						disabled={isLoading}>
						{isRegisterForm ? 'Create account' : 'Login'}
					</Button>

					{formError.error && (
						<Message
							messageType="error"
							text={formError.message || 'Oops! There was an error.'}
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
			</Form>
		</FormContainer>
	);
};

const DividerText = styled.p`
	margin: 1em 0em;
	opacity: 0.8;
	font-size: 1.1rem;
`;
