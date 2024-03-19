import { FormError, type InputEvent } from '@/types/form-types';
import { Form } from 'semantic-ui-react';
import { Message, Segment } from '@/components/ui';
import { Flex, Text, Heading, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { FormContainer, AuthContainer } from '../form-components';

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

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
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
				<Heading as="h1" mb="4">
					tidytrek
				</Heading>
				<Form size="large">
					<Segment $radius="2">
						<Heading as="h3" size="6" color="jade" mb="4">
							Reset Password
						</Heading>

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
							size="3"
							style={{ width: '100%' }}
							onClick={hasResetToken ? onResetConfirm : onResetRequest}>
							{hasResetToken ? 'Confirm New Password' : 'Reset Password'}
						</Button>

						{error && (
							<Message
								messageType="error"
								text={message || 'Oops! There was an error.'}
								id="reset-password-message"
							/>
						)}

						{emailSent && (
							<Message
								messageType="success"
								text={resetInstructionMessage}
								id="reset-password-message"
							/>
						)}
						<Flex justify="center" mt="4">
							<Text size="3">
								<Link to={'/'}>Log In</Link> | <Link to={'/register'}>Sign Up</Link>
							</Text>
						</Flex>
					</Segment>
				</Form>
			</FormContainer>
		</AuthContainer>
	);
};

// defaults
const resetInstructionMessage =
	'If you have an account on Tidytrek, you will receive an email with a link to reset your password. Be sure to check your spam folder too.';
