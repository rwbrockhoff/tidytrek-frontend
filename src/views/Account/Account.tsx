import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Header, Icon } from 'semantic-ui-react';
import './Account.css';

const Account = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="account-container">
      <Header as="h3">
        <Icon name="user" />
        Account Info
      </Header>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Account;
