import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

interface FormProps {
  isRegisterForm: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const LogInForm: React.FC<FormProps> = ({
  isRegisterForm,
  onFormChange,
  onSubmit,
}) => {
  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h1" textAlign="center">
        tidytrek
      </Header>
      <Form size="large">
        <Segment stacked>
          <Header as="h2" color="teal" textAlign="center">
            {isRegisterForm
              ? "Register your account"
              : "Log-in to your account"}
          </Header>
          {isRegisterForm && (
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Name"
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
            onChange={onFormChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={onFormChange}
          />
          {isRegisterForm && (
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Verify password"
              type="password"
              onChange={onFormChange}
            />
          )}

          <Button color="teal" fluid size="large" onClick={onSubmit}>
            {isRegisterForm ? "Register" : "Login"}
          </Button>
        </Segment>
      </Form>

      {isRegisterForm ? (
        <Message>
          Already have an account? <Link to={"/"}>Log In</Link>
        </Message>
      ) : (
        <Message>
          New here? <Link to={"/register"}>Sign Up</Link>
        </Message>
      )}
    </Grid.Column>
  );
};

export default LogInForm;
