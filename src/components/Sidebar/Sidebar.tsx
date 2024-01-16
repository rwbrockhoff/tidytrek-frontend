import './Sidebar.css';
import { useLogoutMutation } from '../../redux/user/userApiSlice';
import { Link } from 'react-router-dom';
import { Divider, Icon } from 'semantic-ui-react';
import PackList from './PackList/PackList';

const Navigation = () => {
  const [logout] = useLogoutMutation();

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
        <li onClick={logout}>
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
