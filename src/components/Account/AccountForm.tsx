import { Segment, Button, Icon } from 'semantic-ui-react';

const AccountForm = () => {
	return (
		<Segment fluid>
			<p>Account Form</p>
			<Button basic color="red">
				<Icon name="trash" />
				Delete Account
			</Button>
		</Segment>
	);
};

export default AccountForm;
