import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import './LogInForm.css';
import { FormError, ReactInput } from '../../../types/generalTypes';

type FormProps = {
	isRegisterForm: boolean;
	isLoading: boolean;
	formError: FormError;
	onFormChange: (e: ReactInput) => void;
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
		<Grid.Column style={{ maxWidth: 450 }}>
			<Header as="h1" textAlign="center">
				tidytrek app
			</Header>
			<Form size="large">
				<Segment stacked>
					<Header as="h2" color="blue" textAlign="center">
						{isRegisterForm ? 'Register your account' : 'Log-in to your account'}
					</Header>
					{isRegisterForm && (
						<>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Name"
								name="name"
								data-testid="name-input"
								type="name"
								onChange={onFormChange}
							/>
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
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Verify password"
							type="password"
							name="confirmPassword"
							data-testid="verify-password-input"
							onChange={onFormChange}
						/>
					)}

					<Button color="blue" fluid size="large" disabled={isLoading} onClick={onSubmit}>
						{isRegisterForm ? 'Register' : 'Login'}
					</Button>

					{formError.error && (
						<Message color="red" data-testid="error-message">
							<Icon name="hand point right outline" />
							{formError.message || 'Oops! There was an error.'}
						</Message>
					)}
					{isRegisterForm ? (
						<p style={{ marginTop: '25px' }}>
							Already have an account? <Link to={'/'}>Log In</Link>
						</p>
					) : (
						<p style={{ marginTop: '25px' }}>
							<Link to={'/register'}>Sign Up</Link> |{' '}
							<Link to={'/reset-password'}>Forgot Your Password</Link>
						</p>
					)}
				</Segment>
			</Form>
		</Grid.Column>
	);
};

export default LogInForm;
