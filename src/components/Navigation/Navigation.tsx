import "./Navigation.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";
import { Icon } from "semantic-ui-react";

const Navigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <nav>
      <h1>
        <a href="/">tidytrek</a>
      </h1>
      <menu>
        <a href="/account">Account</a>
        <li onClick={handleLogOut}>
          <Icon name="log out" />
          Log Out
        </li>
      </menu>
    </nav>
  );
};

export default Navigation;
