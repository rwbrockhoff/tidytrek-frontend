import { type User } from '@/types/user-types';
import { type FormSection } from '../../types/account-types';
import { useState } from 'react';
import { Heading, Button } from '@radix-ui/themes';
import { DeleteModal, TrashIcon, Segment, SegmentGroup } from '@/components/ui';
import { PasswordForm } from './password-form/password-form';

type AccountFormProps = {
	user: User | null;
	deleteAccount: () => void;
};

export const AccountForm = (props: AccountFormProps) => {
	const { user, deleteAccount } = props;

	const [displayFormSection, setDisplayFormSection] = useState<FormSection>('initial');

	const handleChangeFormSection = (section: FormSection) =>
		setDisplayFormSection(section);

	const { firstName, lastName, email } = user || {};
	const fullName = `${firstName} ${lastName}`;

	return (
		<SegmentGroup direction="column">
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
			<Segment stacked>
				<PasswordForm
					displayFormSection={displayFormSection}
					changeFormSection={handleChangeFormSection}
				/>
			</Segment>
			<Segment>
				<Heading as="h4" size="3" mb="4">
					Delete Your Account
				</Heading>

				<p>
					Deleting your account will permanently delete all of your packs. Be sure to save
					any important information first.
				</p>
				<DeleteModal
					simple
					header="Delete Your Account"
					message={deleteMessage}
					onClickDelete={deleteAccount}>
					<div>
						<Button color="tomato" mt="4">
							<TrashIcon />
							Delete Account
						</Button>
					</div>
				</DeleteModal>
			</Segment>
		</SegmentGroup>
	);
};

// defaults
const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";
