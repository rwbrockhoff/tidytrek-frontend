import { type User } from '@/types/user-types';
import { Heading } from '@radix-ui/themes';
import { Segment } from '@/components/primitives';

type AccountInfoDisplayProps = {
	user: User | null;
};

export const AccountInfoDisplay = ({ user }: AccountInfoDisplayProps) => {
	const { firstName, lastName, email } = user || {};
	const fullName = `${firstName} ${lastName}`;

	return (
		<Segment>
			<Heading as="h4" size="3" mb="4">
				Account Info
			</Heading>
			<p>
				<b>Name:</b> {fullName || 'A Tidy Hiker'}
			</p>
			<p>
				<b>Email:</b> {email || 'No email here. Too busy hiking.'}
			</p>
		</Segment>
	);
};
