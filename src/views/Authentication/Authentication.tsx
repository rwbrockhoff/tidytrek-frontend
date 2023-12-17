import { useState } from "react";
import LogInForm from "../../components/Authentication/LogInForm/LogInForm";
import { Grid } from "semantic-ui-react";

export interface AuthProps {
  isRegisterForm: boolean;
}

const Authentication: React.FC<AuthProps> = (props: AuthProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    console.log("Submit Form Data: ", formData);
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
