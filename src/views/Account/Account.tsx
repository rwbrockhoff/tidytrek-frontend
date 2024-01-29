import {
	useGetAuthStatusQuery,
	useDeleteAccountMutation,
} from '../../redux/user/userApiSlice';
import { useState } from 'react';
import { Icon, Header } from 'semantic-ui-react';
import AccountForm from '../../components/Account/AccountForm/AccountForm';
import { DeleteModal } from '../../components/Dashboard/PackCategory/Modals/Modals';
import './Account.css';

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const [deleteAccount] = useDeleteAccountMutation();
	const user = data?.user;

	const [toggleModal, setToggleModal] = useState(false);

	const handleToggleModal = () => setToggleModal(!toggleModal);

	const handleEditAccount = () => {
		// do something
	};

	const handleDeleteAccount = () => {
		deleteAccount();
	};

	return (
		<div className="account-container">
			<Header as="h3">
				<Icon name="user outline" />
				Account Info
			</Header>
			<AccountForm
				user={user}
				editAccount={handleEditAccount}
				deleteAccount={handleToggleModal}
			/>
			<DeleteModal
				simple
				open={toggleModal}
				header="Delete Your Account"
				message={deleteMessage}
				onClose={handleToggleModal}
				onClickDelete={handleDeleteAccount}
			/>
		</div>
	);
};

export default Account;
