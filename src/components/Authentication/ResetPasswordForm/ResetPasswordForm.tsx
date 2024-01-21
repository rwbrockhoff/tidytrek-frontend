import {
  Grid,
  Header,
  Form,
  Segment,
  Message,
  Icon,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type ResetPasswordFormProps = {
  isLoading: boolean;
  isSuccess: boolean;
  formError: boolean;
  formErrorMessage: string;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const {
    isLoading,
    isSuccess,
    formError,
    formErrorMessage,
    onFormChange,
    onSubmit,
  } = props;
  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h1" textAlign="center">
        tidytrek app
      </Header>
      <Form size="large">
        <Segment stacked>
          <Header as="h2" color="blue" textAlign="center">
            Reset Password
          </Header>

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

          <Button
            color="blue"
            fluid
            size="large"
            disabled={isLoading}
            onClick={onSubmit}
          >
            Reset Password
          </Button>

          {formError && (
            <Message color="red" data-testid="error-message">
              <Icon name="hand point right outline" />
              {formErrorMessage || 'Oops! There was an error.'}
            </Message>
          )}

          {isSuccess && (
            <Message color="green" data-testid="success-message">
              <Icon name="check" />
              Please check your inbox for a link to reset your password.
            </Message>
          )}

          <p style={{ marginTop: '25px' }}>
            <Link to={'/'}>Log In</Link> | <Link to={'/register'}>Sign Up</Link>
          </p>
        </Segment>
      </Form>
    </Grid.Column>
  );
};

export default ResetPasswordForm;
