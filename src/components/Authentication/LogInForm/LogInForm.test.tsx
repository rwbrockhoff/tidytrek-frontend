import { wrappedRender } from '../../../tests/test-utils';
import { screen } from '@testing-library/react';
import LogInForm from './LogInForm';

const RegisterFormWithProps = (
  <LogInForm
    isRegisterForm={true}
    isLoading={false}
    formError={false}
    formErrorMessage={''}
    onFormChange={() => console.log('Form Change')}
    onSubmit={() => console.log('Form Submit')}
  />
);

const LogInFormWithProps = (
  <LogInForm
    isRegisterForm={false}
    isLoading={false}
    formError={false}
    formErrorMessage={''}
    onFormChange={() => console.log('Form Change')}
    onSubmit={() => console.log('Form Submit')}
  />
);

describe('LogInForm', () => {
  it('Should render component', () => {
    wrappedRender(RegisterFormWithProps);
  });

  it('Should show register form ui', () => {
    wrappedRender(RegisterFormWithProps);
    const registerButton = screen.getByRole('button', { name: /register/i });
    const nameInput = screen.getByTestId('name-input');
    const verifyPasswordInput = screen.getByTestId('verify-password-input');

    expect(nameInput).toBeDefined();
    expect(verifyPasswordInput).toBeDefined();
    expect(registerButton).toHaveTextContent(/register/i);
  });

  it.todo('Should require valid email', async () => {
    const { user } = wrappedRender(RegisterFormWithProps);
    const registerButton = screen.getByRole('button', { name: /register/i });

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');

    await user.type(nameInput, 'Josh Collins');
    await user.type(emailInput, 'jcollins@gmail');

    await user.click(registerButton);

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeDefined();
  });

  it('Should show log in ui', () => {
    wrappedRender(LogInFormWithProps);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toHaveTextContent(/login/i);
  });
});
