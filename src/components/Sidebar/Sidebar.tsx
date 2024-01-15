import './Sidebar.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/store';
import { Divider, Icon } from 'semantic-ui-react';
import PackList from './PackList/PackList';

const Navigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <nav>
      <h1>
        <Link to="/">tidytrek</Link>
      </h1>
      <menu className="nav-menu">
        <li>
          <Link to="/account">
            <Icon name="user outline" />
            Account
          </Link>
        </li>
        <li onClick={handleLogOut}>
          <Icon name="log out" />
          Log Out
        </li>
      </menu>
      <Divider />
      <PackList />
    </nav>
  );
};

export default Navigation;
