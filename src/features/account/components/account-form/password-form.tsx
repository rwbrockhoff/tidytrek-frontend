import { useRef, type FormEvent } from 'react';
import { FormSection } from '../../types/account-types';
import { InputEvent, TextAreaEvent, type PasswordInfo } from '@/types/form-types';
import { useState } from 'react';
import styles from './password-form.module.css';
import { Flex, Heading, Button } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import { TextField } from '@/components/ui/alpine/';
import { Link, Message, PasswordIcon } from '@/components/ui';
import { ConfirmationForm } from './confirmation-form';
import { reauthenticateUser, updatePassword } from '@/api/supabaseClient';
import { z, passwordSchema } from '@/schemas';
import { useZodError, clearZodErrors } from '@/hooks';

type PasswordFormProps = {
	displayFormSection: FormSection;
	changeFormSection: (section: FormSection) => void;
};

type ZodInputs = {
	password: string;
	confirmPassword: string;
	emailCode: string;
};

export const PasswordForm = (props: PasswordFormProps) => {
	const { displayFormSection, changeFormSection } = props;

	const formRef = useRef<HTMLFormElement | null>(null);
	const [confirmationSent, setConfirmationSent] = useState(false);
	const [formSuccess, setFormSuccess] = useState(false);

	const [serverError, setServerError] = useState({ error: false, message: '' });
	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<ZodInputs>([
		'password',
		'confirmPassword',
		'emailCode',
	]);

	const handleSendConfirmation = async () => {
		try {
			changeFormSection('passwordForm');
			const { error } = await reauthenticateUser();
			if (!error) setConfirmationSent(true);
		} catch (err) {
			setServerError({ error: true, message: confirmationErrorMessage });
		}
	};

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validate form
		const data = Object.fromEntries(new FormData(e.currentTarget)) as PasswordInfo;
		const schemaData = changePasswordSchema.safeParse(data);
		if (!schemaData.success) {
			const errorList = JSON.parse(schemaData.error.message);
			return updateFormErrors(errorList);
		}
		// send request to supabase
		const { password, emailCode } = data;
		const { error } = await updatePassword(password, emailCode);
		// handle supabase error
		if (error) return setServerError({ error: true, message: supabaseErrorMessage });
		// handle success
		else {
			formRef?.current && formRef.current.reset();
			setFormSuccess(true);
		}
	};

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		clearZodErrors<ZodInputs>(e, formErrors, resetFormErrors);
		if (serverError.error) setServerError({ error: false, message: '' });
	};

	const handleCloseForm = () => {
		// reset form state
		changeFormSection('initial');
		setFormSuccess(false);
		setServerError({ error: false, message: '' });
		formRef?.current && formRef.current.reset();
	};

	// show confirmation form when the section is chosen,
	// or to show 'email sent' message when passwordForm is visible
	const showConfirmationForm =
		(!formSuccess && displayFormSection === 'confirmationForm') ||
		(displayFormSection === 'passwordForm' && confirmationSent && !formSuccess);

	return (
		<>
			<Heading as="h4" size="3" mb="4">
				Update Your Password
			</Heading>
			{displayFormSection === 'initial' && (
				<Button
					variant="outline"
					color="gray"
					onClick={() => changeFormSection('confirmationForm')}>
					<PasswordIcon />
					Change Password
				</Button>
			)}

			{showConfirmationForm && (
				<ConfirmationForm
					sendConfirmation={handleSendConfirmation}
					confirmationSent={confirmationSent}
				/>
			)}

			{displayFormSection === 'passwordForm' && (
				<Form style={{ width: '50%' }} ref={formRef} onSubmit={handleSubmitForm}>
					<TextField.Input
						name="password"
						label="New Password"
						error={formErrors.password}
						onChange={handleClearErrors}
						type="password"
						placeholder="New Password"
					/>

					<TextField.Input
						name="confirmPassword"
						label="Confirm Password"
						error={formErrors.confirmPassword}
						onChange={handleClearErrors}
						type="password"
						placeholder="Confirm Password"
					/>

					<TextField.Input
						name="emailCode"
						label="Email Code"
						error={formErrors.emailCode}
						onChange={handleClearErrors}
						placeholder="Email Code"
					/>

					<Link to="/reset-password">
						<p>Reset Your Password</p>
					</Link>

					{serverError.error && (
						<Message messageType="error" text={serverError.message} />
					)}

					{formSuccess && <Message messageType="success" text={successMessage} />}

					<Flex justify="end" gap="3" className={styles.buttonContainer}>
						<Button variant="outline" color="gray" onClick={handleCloseForm}>
							{formSuccess ? 'Close' : 'Cancel'}
						</Button>
						<Button type="submit">Save Password</Button>
					</Flex>
				</Form>
			)}
		</>
	);
};

// schemas
const changePasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
		emailCode: z.string().min(6, { message: 'Invalid confirmation code.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

// defaults
const supabaseErrorMessage =
	'There was an error updating your password. You might need to try again.';

const confirmationErrorMessage =
	'There was an error sending a confirmation code. Please try again later.';

const successMessage = 'Your password was changed successfully.';
