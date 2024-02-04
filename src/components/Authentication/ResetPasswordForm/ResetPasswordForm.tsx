import { Grid, Header, Form, Segment, Message, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ReactInput } from '../../../types/generalTypes';

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
		<Grid.Column style={{ maxWidth: 450 }}>
			<Header as="h1" textAlign="center">
				tidytrek app
			</Header>
			<Form size="large">
				<Segment stacked>
					<Header as="h2" color="blue" textAlign="center">
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
						color="blue"
						fluid
						size="large"
						disabled={isLoading}
						onClick={hasResetToken ? onResetConfirm : onResetRequest}>
						{hasResetToken ? 'Confirm New Password' : 'Reset Password'}
					</Button>

					{formError && (
						<Message color="red" data-testid="error-message">
							<Icon name="hand point right outline" />
							{formErrorMessage || 'Oops! There was an error.'}
						</Message>
					)}

					{isSuccess && (
						<Message color="green" data-testid="success-message">
							<Icon name="check" />
							Please check your inbox for a link to reset your password.
						</Message>
					)}

					<p style={{ marginTop: '25px' }}>
						<Link to={'/'}>Log In</Link> | <Link to={'/register'}>Sign Up</Link>
					</p>
				</Segment>
			</Form>
		</Grid.Column>
	);
};

export default ResetPasswordForm;
