import { type InputEvent } from '../../../types/formTypes';
import { Link } from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react';
import { Button, Header } from '../../../shared/ui/SemanticUI';
import { FormContainer, FooterText, FormMessage } from '../FormComponents';
import { FormError } from '../../../types/formTypes';
import RegisterFormSection from '../RegisterFormSection/RegisterFormSection';
import { RegisterUserFormData } from '../../../types/userTypes';
import GoogleAuth from '../GoogleAuth';
import styled from 'styled-components';
import { SubText } from '../../../shared/ui/TidyUI';

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

const LogInForm = ({
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
			<Header as="h1">tidytrek</Header>
			<Form size="large">
				<Segment stacked>
					<Header as="h3" $marginBottom="1.5em" $tidyColor="tidyPrimary">
						{isRegisterForm ? 'Register your account' : 'Log-in to your account'}
					</Header>

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
						$tidyColor="tidyPrimary"
						fluid
						size="large"
						onClick={onSubmit}
						disabled={isLoading}>
						{isRegisterForm ? 'Create account' : 'Login'}
					</Button>

					{formError.error && (
						<FormMessage
							messageType="error"
							text={formError.message || 'Oops! There was an error.'}
							id="login-form-message"
						/>
					)}

					{isRegisterSuccess && (
						<FormMessage
							messageType="success"
							text="Check your email for a link to sign in."
							id="register-success-message"
						/>
					)}

					<StyledSubText>
						By clicking "Create account" or "Continue with Google", you agree to the
						Tidytrek Terms of Service and Privacy Policy.
					</StyledSubText>

					{isRegisterForm && (
						<FooterText style={{ marginTop: '2em' }}>
							Already have an account? <Link to={'/'}>Log In</Link>
						</FooterText>
					)}

					{!isRegisterForm && (
						<FooterText>
							<Link to={'/register'}>Sign Up</Link> |{' '}
							<Link to={'/reset-password'}>Forgot Your Password</Link>
						</FooterText>
					)}
				</Segment>
			</Form>
		</FormContainer>
	);
};

export default LogInForm;

const DividerText = styled.p`
	margin: 1em 0em;
	opacity: 0.8;
	font-size: 1.1rem;
`;

const StyledSubText = styled(SubText)`
	margin-top: 2em;
`;
