import { wrappedRender } from '@/tests/test-utils';
import { screen } from '@testing-library/react';
import { Authentication } from '../../routes/authentication';

const RegisterFormWithProps = <Authentication isRegisterForm={true} />;
const LoginFormWithProps = <Authentication isRegisterForm={false} />;

describe('LogInForm', () => {
	it('Should render component', () => {
		wrappedRender(RegisterFormWithProps);
	});

	it('Should show register form ui', () => {
		wrappedRender(RegisterFormWithProps);
		const registerButton = screen.getByRole('button', { name: /create account/i });
		const nameInput = screen.getByTestId('first-name-input');

		expect(nameInput).toBeDefined();
		expect(registerButton).toHaveTextContent(/create account/i);
	});

	it('Should require valid email', async () => {
		const { user } = wrappedRender(RegisterFormWithProps);

		const registerButton = screen.getByRole('button', { name: /create account/i });

		const nameInput = screen.getByTestId('first-name-input');
		const lastNameInput = screen.getByTestId('last-name-input');
		const emailInput = screen.getByTestId('email-input');

		await user.type(nameInput, 'Josh');
		await user.type(lastNameInput, 'Collins');
		await user.type(emailInput, 'jcollins@gmail');

		await user.click(registerButton);

		expect(screen.getByTestId('auth-message-error')).toBeInTheDocument();
		expect(screen.getByTestId('auth-message-error')).toHaveAccessibleName();
	});

	it('Should show log in ui', () => {
		wrappedRender(LoginFormWithProps);
		const loginButton = screen.getByRole('button', { name: /login/i });
		expect(loginButton).toHaveTextContent(/login/i);
	});
});
