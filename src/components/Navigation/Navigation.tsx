import "./Navigation.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";

const Navigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <nav>
      <h1>tidytrek</h1>
      <menu>
        <li onClick={handleLogOut}>Log Out</li>
      </menu>
    </nav>
  );
};

export default Navigation;
