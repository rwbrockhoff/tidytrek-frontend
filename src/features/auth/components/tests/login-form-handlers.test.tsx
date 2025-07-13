import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { LoginForm, type LoginFormProps } from '../login/login-form';
import { wrappedRender } from '@/tests/wrapper-utils';

// Create mock form errors
const createMockFormErrors = () => ({
	email: { error: false, message: '' },
	password: { error: false, message: '' },
});

// Default props for the form component
const createDefaultProps = (overrides?: Partial<LoginFormProps>): LoginFormProps => ({
	isLoading: false,
	formErrors: createMockFormErrors(),
	serverError: { error: false, message: '' },
	onSubmit: vi.fn(),
	resetFormErrors: vi.fn(),
	updateServerError: vi.fn(),
	...overrides,
});

describe('LoginForm - handleFormSubmit', () => {
	it('calls onSubmit with form data when submitting login form', async () => {
		const mockOnSubmit = vi.fn();
		const props = createDefaultProps({
			onSubmit: mockOnSubmit,
		});

		const { user } = wrappedRender(<LoginForm {...props} />);

		// Fill out the form using data-testid (and verify accessibility)
		const emailInput = screen.getByTestId('email-input');
		const passwordInput = screen.getByTestId('password-input');
		
		expect(emailInput).toHaveAccessibleName();
		expect(passwordInput).toHaveAccessibleName();
		
		await user.type(emailInput, 'test@dundermifflin.com');
		await user.type(passwordInput, 'password123');

		// Submit the form
		await user.click(screen.getByRole('button', { name: /login/i }));

		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
		expect(mockOnSubmit).toHaveBeenCalledWith({
			email: 'test@dundermifflin.com',
			password: 'password123',
		});
	});

	it('displays form validation errors', async () => {
		const props = createDefaultProps({
			formErrors: {
				email: { error: true, message: 'Invalid email' },
				password: { error: false, message: '' },
			},
		});

		wrappedRender(<LoginForm {...props} />);

		// Check that error message is displayed
		expect(screen.getByText('Invalid email')).toBeInTheDocument();
	});
});
