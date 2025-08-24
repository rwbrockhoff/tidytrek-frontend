import { useRef, useEffect, type FormEvent } from 'react';
import { Form } from '@radix-ui/react-form';
import { Box } from '@/components/layout';
import { TextField, Button } from '@/components/alpine';
import { Alert } from '@/components/ui';
import { type FormError, type InputEvent } from '@/types/form-types';
import { type RegisterUserFormData } from '@/types/user-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

type RegisterFormProps = {
	isLoading: boolean;
	isRegisterSuccess: boolean;
	formErrors: ZodFormErrors<RegisterUserFormData>;
	serverError: FormError;
	onSubmit: (formData: RegisterUserFormData) => void;
	resetFormErrors: (inputName?: string) => void;
	updateServerError: (message: string) => void;
};

export const RegisterForm = ({
	isLoading,
	isRegisterSuccess,
	formErrors,
	serverError,
	onSubmit,
	resetFormErrors,
}: RegisterFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		onSubmit(data as RegisterUserFormData);
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors(e, formErrors, resetFormErrors);
		if (serverError.error) resetFormErrors();
	};

	useEffect(() => {
		if (isRegisterSuccess) {
			formRef?.current?.reset();
		}
	}, [isRegisterSuccess]);

	return (
		<>
			<Form ref={formRef} onSubmit={handleFormSubmit}>
				<TextField.Input
					name="firstName"
					placeholder="First Name"
					aria-label="First Name"
					onChange={handleClearErrors}
					error={formErrors.firstName}
					data-testid="first-name-input"
				/>

				<TextField.Input
					name="lastName"
					placeholder="Last Name"
					aria-label="Last Name"
					onChange={handleClearErrors}
					error={formErrors.lastName}
					data-testid="last-name-input"
				/>

				<TextField.Input
					name="email"
					placeholder="Email"
					aria-label="Email"
					onChange={handleClearErrors}
					error={formErrors.email}
					data-testid="email-input"
				/>

				<TextField.Input
					name="password"
					placeholder="Password"
					aria-label="Password"
					onChange={handleClearErrors}
					error={formErrors.password}
					type="password"
					data-testid="password-input"
				/>

				<Box className="mt-4">
					<Button type="submit" style={{ width: '100%' }} loading={isLoading}>
						Create account
					</Button>
				</Box>
			</Form>

			{isRegisterSuccess && (
				<Alert
					variant="success"
					className="mt-4"
					data-testid="auth-message-success"
				>
					Check your email for a link to sign in.
				</Alert>
			)}
		</>
	);
};
