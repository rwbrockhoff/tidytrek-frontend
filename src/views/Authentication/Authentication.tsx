import { useState } from "react";
import LogInForm from "../../components/Authentication/LogInForm/LogInForm";
import { Grid } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logInUser, registerUser } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";

export interface AuthProps {
  isRegisterForm: boolean;
}

const Authentication: React.FC<AuthProps> = (props: AuthProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    error: false,
    message: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const validEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validPassword = (password: string) => {
    if (password.length < 8) {
      return false;
    } else if (password.search(/[a-z]/) < 0) {
      return false;
    } else if (password.search(/[A-Z]/) < 0) {
      return false;
    } else if (password.search(/[0-9]/) < 0) {
      return false;
    } else {
      return true;
    }
  };

  const invalidForm = (
    message: string = "Please make sure to fill out form properly."
  ) => {
    setFormError((prevState) => ({
      ...prevState,
      error: true,
      message,
    }));
  };

  const validateFormData = () => {
    const { name, email, password, confirmPassword } = formData;
    //validate name when registering
    if (!name) {
      invalidForm("Please type in your name.");
      return false;
    }
    //validate email
    else if (!email || !validEmail(email)) {
      invalidForm("Please include a valid email address.");
      return false;
    } else if (!password) {
      invalidForm("Please type in your password.");
      return false;
    }
    //validate passwords match when registering
    else if (password !== confirmPassword) {
      invalidForm("Passwords need to match.");
      return false;
    } else if (!validPassword(password)) {
      invalidForm(
        "Password should have at least 8 characters, contain one uppercase, and one number."
      );
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = () => {
    const { isRegisterForm } = props;
    const { name, email, password } = formData;
    if (isRegisterForm) {
      const formIsValid = validateFormData();
      formIsValid && dispatch(registerUser({ name, email, password }));
    } else {
      if (email && password) {
        dispatch(logInUser({ email, password }));
      }
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <LogInForm
        isRegisterForm={props.isRegisterForm}
        onFormChange={handleFormChange}
        onSubmit={handleFormSubmit}
      />
    </Grid>
  );
};

export default Authentication;
