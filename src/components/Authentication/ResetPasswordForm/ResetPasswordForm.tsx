import { FormError, type InputEvent } from '../../../types/formTypes';
import { Form, Segment } from 'semantic-ui-react';
import { Header, Button } from '../../../shared/ui/SemanticUI';
import { Link } from 'react-router-dom';
import { FooterText, FormContainer, FormMessage } from '../FormComponents';
import { AuthContainer } from '../FormComponents';

type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
};

type ResetPasswordFormProps = {
	formData: FormData;
	formError: FormError;
	emailSent: boolean;
	hasResetToken: boolean;
	onFormChange: (e: InputEvent) => void;
	onResetRequest: () => void;
	onResetConfirm: () => void;
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
	const {
		formData,
		formError,
		emailSent,
		hasResetToken,
		onFormChange,
		onResetRequest,
		onResetConfirm,
	} = props;

	const { error, message } = formError;
	const { email, password, confirmPassword } = formData;
	return (
		<AuthContainer>
			<FormContainer>
				<Header as="h1">tidytrek</Header>
				<Form size="large">
					<Segment stacked>
						<Header as="h3">Reset Password</Header>

						{!hasResetToken && (
							<Form.Input
								fluid
								icon="at"
								type="email"
								iconPosition="left"
								placeholder="E-mail address"
								name="email"
								data-testid="email-input"
								value={email}
								onChange={onFormChange}
							/>
						)}

						{hasResetToken && (
							<>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
									name="password"
									data-testid="password-input"
									value={password}
									onChange={onFormChange}
								/>

								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Verify password"
									type="password"
									name="confirmPassword"
									data-testid="verify-password-input"
									value={confirmPassword}
									onChange={onFormChange}
								/>
							</>
						)}

						<Button
							$tidyColor="tidyPrimary"
							fluid
							size="large"
							onClick={hasResetToken ? onResetConfirm : onResetRequest}>
							{hasResetToken ? 'Confirm New Password' : 'Reset Password'}
						</Button>

						{error && (
							<FormMessage
								messageType="error"
								text={message || 'Oops! There was an error.'}
								id="reset-password-error-message"
							/>
						)}

						{emailSent && (
							<FormMessage
								messageType="success"
								text={resetInstructionMessage}
								id="reset-password-success-message"
							/>
						)}

						<FooterText>
							<Link to={'/'}>Log In</Link> | <Link to={'/register'}>Sign Up</Link>
						</FooterText>
					</Segment>
				</Form>
			</FormContainer>
		</AuthContainer>
	);
};

export default ResetPasswordForm;

// defaults
const resetInstructionMessage =
	'If you have an account on Tidytrek, you will receive an email with a link to reset your password. Be sure to check your spam folder too.';
