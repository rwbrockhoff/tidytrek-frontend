import { Form, Segment } from 'semantic-ui-react';
import { Header, Button } from '../../../shared/ui/SemanticUI';
import { Link } from 'react-router-dom';
import { ReactInput } from '../../../types/generalTypes';
import { FooterText, FormContainer, FormMessage } from '../FormComponents';
import { AuthContainer } from '../FormComponents';

type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
};

type ResetPasswordFormProps = {
	formData: FormData;
	hasResetToken: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	formError: boolean;
	formErrorMessage: string;
	onFormChange: (e: ReactInput) => void;
	onResetRequest: () => void;
	onResetConfirm: () => void;
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
	const {
		formData,
		hasResetToken,
		isLoading,
		isSuccess,
		formError,
		formErrorMessage,
		onFormChange,
		onResetRequest,
		onResetConfirm,
	} = props;
	const { email, password, confirmPassword } = formData;
	return (
		<AuthContainer>
			<FormContainer>
				<Header as="h1">tidytrek</Header>
				<Form size="large">
					<Segment stacked>
						<Header as="h3" $themeColor="tidyGreen">
							Reset Password
						</Header>

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
							$themeColor="tidyGreen"
							fluid
							size="large"
							disabled={isLoading}
							onClick={hasResetToken ? onResetConfirm : onResetRequest}>
							{hasResetToken ? 'Confirm New Password' : 'Reset Password'}
						</Button>

						{formError && (
							<FormMessage
								messageType="error"
								text={formErrorMessage || 'Oops! There was an error.'}
								id="reset-password-message"
							/>
						)}

						{isSuccess && (
							<FormMessage
								messageType="success"
								text={'Please check your inbox for a link to reset your password.'}
								id="reset-password-message"
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
