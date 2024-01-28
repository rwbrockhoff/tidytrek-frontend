import { useGetAuthStatusQuery } from '../../redux/user/userApiSlice';
import AccountForm from '../../components/Account/AccountForm';
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
			<p>Username: {user?.username || 'No trail name yet? Take your time.'}</p>

			<AccountForm />
		</div>
	);
};

export default Account;
