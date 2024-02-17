import { Link } from 'react-router-dom';
import {
	Button,
	Form,
	Grid,
	Header,
	Icon,
	Message,
	Segment,
	FormCheckbox,
} from 'semantic-ui-react';
import './LogInForm.css';
import { FormError, ReactInput } from '../../../types/generalTypes';
import DisplayWrapper from '../../../shared/ui/DisplayWrapper';
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

					<Button color="blue" fluid size="large" disabled={isLoading} onClick={onSubmit}>
						{isRegisterForm ? 'Register' : 'Login'}
					</Button>

					<DisplayWrapper display={formError.error}>
						<Message color="red" data-testid="error-message">
							<Icon name="hand point right outline" />
							{formError.message || 'Oops! There was an error.'}
						</Message>
					</DisplayWrapper>

					<DisplayWrapper display={isRegisterForm}>
						<p style={{ marginTop: '25px' }}>
							Already have an account? <Link to={'/'}>Log In</Link>
						</p>
					</DisplayWrapper>

					<DisplayWrapper display={!isRegisterForm}>
						<p style={{ marginTop: '25px' }}>
							<Link to={'/register'}>Sign Up</Link> |{' '}
							<Link to={'/reset-password'}>Forgot Your Password</Link>
						</p>
					</DisplayWrapper>
				</Segment>
			</Form>
		</Grid.Column>
	);
};

export default LogInForm;
