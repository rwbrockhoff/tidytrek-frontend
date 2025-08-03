import { useRef, type FormEvent } from 'react';
import { Form } from '@radix-ui/react-form';
import { Box } from '@/components/layout';
import { TextField, Button } from '@/components/alpine';
import { AuthFormLayout } from '../shared/auth-form-layout';
import { type FormError, type InputEvent } from '@/types/form-types';
import { type LoginUserFormData } from '@/types/user-types';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

export type LoginFormProps = {
	isLoading: boolean;
	formErrors: ZodFormErrors<LoginUserFormData>;
	serverError: FormError;
	onSubmit: (formData: LoginUserFormData) => void;
	resetFormErrors: (inputName?: string) => void;
	updateServerError: (message: string) => void;
};

export const LoginForm = ({
	isLoading,
	formErrors,
	serverError,
	onSubmit,
	resetFormErrors,
	updateServerError,
}: LoginFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		onSubmit(data as LoginUserFormData);
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors(e, formErrors, resetFormErrors);
		if (serverError.error) resetFormErrors();
	};

	const formContent = (
		<Form ref={formRef} onSubmit={handleFormSubmit}>
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
					Login
				</Button>
			</Box>
		</Form>
	);

	return (
		<AuthFormLayout
			title="Log in to your account"
			authMethod="signin"
			isRegister={false}
			serverError={serverError}
			updateServerError={updateServerError}>
			{formContent}
		</AuthFormLayout>
	);
};
