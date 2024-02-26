import { Link } from 'react-router-dom';
import { Form, Segment, FormCheckbox } from 'semantic-ui-react';
import { Button, Header } from '../../../shared/ui/SemanticUI';
import { FormContainer, FooterText, FormMessage } from '../FormComponents';
import { FormError, ReactInput } from '../../../types/generalTypes';
import { type CheckboxEvent } from '../../../shared/formHelpers';

type FormProps = {
	isRegisterForm: boolean;
	isLoading: boolean;
	formError: FormError;
	onFormChange: (e: ReactInput | CheckboxEvent) => void;
	onSubmit: () => void;
};

const LogInForm = ({
	isRegisterForm,
	isLoading,
	formError,
	onFormChange,
	onSubmit,
}: FormProps) => {
	return (
		<FormContainer>
			<Header as="h1">tidytrek</Header>
			<Form size="large">
				<Segment stacked>
					<Header as="h3" $themeColor="tidyGreen">
						{isRegisterForm ? 'Register your account' : 'Log-in to your account'}
					</Header>
					{isRegisterForm && (
						<>
							<Form.Group>
								<Form.Input
									icon="user"
									iconPosition="left"
									placeholder="First Name"
									name="firstName"
									data-testid="first-name-input"
									type="name"
									width={8}
									onChange={onFormChange}
								/>
								<Form.Input
									icon="user"
									iconPosition="left"
									placeholder="Last Name"
									name="lastName"
									data-testid="last-name-input"
									type="name"
									width={8}
									onChange={onFormChange}
								/>
							</Form.Group>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Username (optional)"
								name="username"
								data-testid="username-input"
								type="name"
								onChange={onFormChange}
							/>
						</>
					)}
					<Form.Input
						fluid
						icon="at"
						type="email"
						iconPosition="left"
						placeholder="E-mail address"
						name="email"
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
						data-testid="password-input"
						onChange={onFormChange}
					/>
					{isRegisterForm && (
						<>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Verify password"
								type="password"
								name="confirmPassword"
								data-testid="verify-password-input"
								onChange={onFormChange}
								width={16}
							/>
							<FormCheckbox
								label="I agree to the terms and conditions"
								name="agreeToTerms"
								onChange={onFormChange}
							/>
						</>
					)}

					<Button
						$themeColor="tidyGreen"
						fluid
						size="large"
						disabled={isLoading}
						onClick={onSubmit}>
						{isRegisterForm ? 'Register' : 'Login'}
					</Button>

					{formError.error && (
						<FormMessage
							messageType="error"
							text={formError.message || 'Oops! There was an error.'}
							id="login-form-message"
						/>
					)}

					{isRegisterForm && (
						<FooterText>
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
