import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';
import './LogInForm.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface FormProps {
  isRegisterForm: boolean;
  formError: boolean;
  formErrorMessage: string;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const LogInForm: React.FC<FormProps> = ({
  isRegisterForm,
  formError,
  formErrorMessage,
  onFormChange,
  onSubmit,
}) => {
  const authError = useSelector((state: RootState) => state.user.authError);
  const authErrorMessage = useSelector(
    (state: RootState) => state.user.authErrorMessage,
  );
  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h1" textAlign="center">
        tidytrek
      </Header>
      <Form size="large">
        <Segment stacked>
          <Header as="h2" color="teal" textAlign="center">
            {isRegisterForm
              ? 'Register your account'
              : 'Log-in to your account'}
          </Header>
          {isRegisterForm && (
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Name"
              name="name"
              data-testid="name-input"
              type="Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                onFormChange(e)
              }
            />
          )}
          <Form.Input
            fluid
            icon="at"
            type="email"
            iconPosition="left"
            placeholder="E-mail address"
            name="email"
            data-testid="email-input"
            onChange={onFormChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
            data-testid="password-input"
            onChange={onFormChange}
          />
          {isRegisterForm && (
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Verify password"
              type="password"
              name="confirmPassword"
              data-testid="verify-password-input"
              onChange={onFormChange}
            />
          )}

          <Button color="teal" fluid size="large" onClick={onSubmit}>
            {isRegisterForm ? 'Register' : 'Login'}
          </Button>

          {(authError || formError) && (
            <Message color="red" data-testid="error-message">
              <Icon name="hand point right outline" />
              {authErrorMessage ||
                formErrorMessage ||
                'Oops! There was an error.'}
            </Message>
          )}
        </Segment>
      </Form>

      {isRegisterForm ? (
        <Message>
          Already have an account? <Link to={'/'}>Log In</Link>
        </Message>
      ) : (
        <Message>
          New here? <Link to={'/register'}>Sign Up</Link>
        </Message>
      )}
    </Grid.Column>
  );
};

export default LogInForm;
