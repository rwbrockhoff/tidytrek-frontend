import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { LogInForm, type AuthFormProps } from '../login-form';
import { wrappedRender } from '@/tests/test-utils';

// Create mock form errors
const createMockFormErrors = () => ({
	firstName: { error: false, message: '' },
	lastName: { error: false, message: '' },
	email: { error: false, message: '' },
	password: { error: false, message: '' },
});

// Default props for the form component
const createDefaultProps = (overrides?: Partial<AuthFormProps>): AuthFormProps => ({
	isRegisterForm: false,
	isRegisterSuccess: false,
	isLoading: false,
	formErrors: createMockFormErrors(),
	serverError: { error: false, message: '' },
	registerUser: vi.fn(),
	loginUser: vi.fn(),
	resetFormErrors: vi.fn(),
	updateServerError: vi.fn(),
	...overrides,
});

describe('LogInForm - handleFormSubmit', () => {
	it('calls loginUser with form data when submitting login form', async () => {
		const mockLoginUser = vi.fn();
		const props = createDefaultProps({
			isRegisterForm: false,
			loginUser: mockLoginUser,
		});

		const { user } = wrappedRender(<LogInForm {...props} />);

		// Fill out the form using data-testid (and verify accessibility)
		const emailInput = screen.getByTestId('email-input');
		const passwordInput = screen.getByTestId('password-input');
		
		expect(emailInput).toHaveAccessibleName();
		expect(passwordInput).toHaveAccessibleName();
		
		await user.type(emailInput, 'test@dundermifflin.com');
		await user.type(passwordInput, 'password123');

		// Submit the form
		await user.click(screen.getByRole('button', { name: /login/i }));

		expect(mockLoginUser).toHaveBeenCalledTimes(1);
		expect(mockLoginUser).toHaveBeenCalledWith({
			email: 'test@dundermifflin.com',
			password: 'password123',
		});
	});

	it('calls registerUser with form data when submitting register form', async () => {
		const mockRegisterUser = vi.fn();
		const props = createDefaultProps({
			isRegisterForm: true,
			registerUser: mockRegisterUser,
		});

		const { user } = wrappedRender(<LogInForm {...props} />);

		// Fill out the registration form using data-testid (and verify accessibility)
		const firstNameInput = screen.getByTestId('first-name-input');
		const lastNameInput = screen.getByTestId('last-name-input');
		const emailInput = screen.getByTestId('email-input');
		const passwordInput = screen.getByTestId('password-input');
		
		expect(firstNameInput).toHaveAccessibleName();
		expect(lastNameInput).toHaveAccessibleName();
		expect(emailInput).toHaveAccessibleName();
		expect(passwordInput).toHaveAccessibleName();
		
		await user.type(firstNameInput, 'Jim');
		await user.type(lastNameInput, 'Halpert');
		await user.type(emailInput, 'jim@dundermifflin.com');
		await user.type(passwordInput, 'password123');

		// Submit the form
		await user.click(screen.getByRole('button', { name: /create account/i }));

		expect(mockRegisterUser).toHaveBeenCalledTimes(1);
		expect(mockRegisterUser).toHaveBeenCalledWith({
			firstName: 'Jim',
			lastName: 'Halpert',
			email: 'jim@dundermifflin.com',
			password: 'password123',
		});
	});

	it('does not call registerUser when in login mode', async () => {
		const mockRegisterUser = vi.fn();
		const mockLoginUser = vi.fn();
		const props = createDefaultProps({
			isRegisterForm: false,
			registerUser: mockRegisterUser,
			loginUser: mockLoginUser,
		});

		const { user } = wrappedRender(<LogInForm {...props} />);

		await user.type(screen.getByTestId('email-input'), 'test@dundermifflin.com');
		await user.type(screen.getByTestId('password-input'), 'password123');
		await user.click(screen.getByRole('button', { name: /login/i }));

		expect(mockLoginUser).toHaveBeenCalledTimes(1);
		expect(mockRegisterUser).not.toHaveBeenCalled();
	});

	it('does not call loginUser when in register mode', async () => {
		const mockRegisterUser = vi.fn();
		const mockLoginUser = vi.fn();
		const props = createDefaultProps({
			isRegisterForm: true,
			registerUser: mockRegisterUser,
			loginUser: mockLoginUser,
		});

		const { user } = wrappedRender(<LogInForm {...props} />);

		await user.type(screen.getByTestId('first-name-input'), 'Jim');
		await user.type(screen.getByTestId('last-name-input'), 'Halpert');
		await user.type(screen.getByTestId('email-input'), 'jim@dundermifflin.com');
		await user.type(screen.getByTestId('password-input'), 'password123');
		await user.click(screen.getByRole('button', { name: /create account/i }));

		expect(mockRegisterUser).toHaveBeenCalledTimes(1);
		expect(mockLoginUser).not.toHaveBeenCalled();
	});
});
