import { useGetAuthStatusQuery } from '../../redux/slices/userApiSlice';
import { Header, Icon } from 'semantic-ui-react';
import './Account.css';

const Account = () => {
  const { data } = useGetAuthStatusQuery();
  const user = data?.user;
  return (
    <div className="account-container">
      <Header as="h3">
        <Icon name="user" />
        Account Info
      </Header>
      <p>Name: {user?.name || 'A Tidy Hiker'}</p>
      <p>Email: {user?.email || 'No email here. Too busy hiking.'}</p>
    </div>
  );
};

export default Account;
