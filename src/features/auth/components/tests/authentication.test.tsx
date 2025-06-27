import { wrappedRender } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import { Authentication } from '../../routes/authentication';

const RegisterFormWithProps = <Authentication isRegisterForm={true} />;
const LoginFormWithProps = <Authentication isRegisterForm={false} />;

describe('Authentication Component', () => {
	describe('Registration Form', () => {
		it('should render registration form component', () => {
			wrappedRender(RegisterFormWithProps);

			// Verify component mounts without errors
			expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
		});

		it('should display registration form UI elements', () => {
			wrappedRender(RegisterFormWithProps);

			const registerButton = screen.getByRole('button', { name: /create account/i });
			const nameInput = screen.getByTestId('first-name-input');
			const lastNameInput = screen.getByTestId('last-name-input');
			const emailInput = screen.getByTestId('email-input');

			expect(nameInput).toBeInTheDocument();
			expect(lastNameInput).toBeInTheDocument();
			expect(emailInput).toBeInTheDocument();
			expect(registerButton).toHaveTextContent(/create account/i);
		});

		it('should have proper form input attributes', () => {
			wrappedRender(RegisterFormWithProps);

			const nameInput = screen.getByTestId('first-name-input');
			const lastNameInput = screen.getByTestId('last-name-input');
			const emailInput = screen.getByTestId('email-input');

			expect(nameInput).toHaveAttribute('type', 'text');
			expect(lastNameInput).toHaveAttribute('type', 'text');
			expect(emailInput).toHaveAttribute('type', 'email');
		});
	});

	describe('Login Form', () => {
		it('should render login form component', () => {
			wrappedRender(LoginFormWithProps);

			// Verify component mounts without errors
			expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
		});

		it('should display login form UI elements', () => {
			wrappedRender(LoginFormWithProps);

			const loginButton = screen.getByRole('button', { name: /login/i });
			const emailInput = screen.getByTestId('email-input');
			const passwordInput = screen.getByTestId('password-input');

			expect(emailInput).toBeInTheDocument();
			expect(passwordInput).toBeInTheDocument();
			expect(loginButton).toHaveTextContent(/login/i);
		});

		it('should have proper form input attributes', () => {
			wrappedRender(LoginFormWithProps);

			const emailInput = screen.getByTestId('email-input');
			const passwordInput = screen.getByTestId('password-input');

			expect(emailInput).toHaveAttribute('type', 'email');
			expect(passwordInput).toHaveAttribute('type', 'password');
		});
	});

	describe('Form Props', () => {
		it('should render different forms based on isRegisterForm prop', () => {
			const { rerender } = wrappedRender(LoginFormWithProps);

			// Login form should be shown
			expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
			expect(screen.queryByTestId('first-name-input')).not.toBeInTheDocument();

			// Switch to register form
			rerender(RegisterFormWithProps);

			expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
			expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
		});
	});
});
