import { render } from '../../../tests/test-utils';
import { screen } from '../../../tests/utilities';
import LogInForm from './LogInForm';

const RegisterFormWithProps = (
  <LogInForm
    isRegisterForm={true}
    formError={false}
    formErrorMessage={''}
    onFormChange={() => console.log('Form Change')}
    onSubmit={() => console.log('Form Submit')}
  />
);

const LogInFormWithProps = (
  <LogInForm
    isRegisterForm={false}
    formError={false}
    formErrorMessage={''}
    onFormChange={() => console.log('Form Change')}
    onSubmit={() => console.log('Form Submit')}
  />
);

describe('LogInForm', () => {
  it('Should render component', () => {
    render(RegisterFormWithProps);
  });

  it('Should show register form ui', () => {
    render(RegisterFormWithProps);
    const registerButton = screen.getByRole('button', { name: /register/i });
    const nameInput = screen.getByTestId('name-input');
    const verifyPasswordInput = screen.getByTestId('verify-password-input');

    expect(nameInput).toBeDefined();
    expect(verifyPasswordInput).toBeDefined();
    expect(registerButton).toHaveTextContent(/register/i);
  });

  it.todo('Should require valid email', async () => {
    const { user } = render(RegisterFormWithProps);
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
    render(LogInFormWithProps);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toHaveTextContent(/login/i);
  });
});