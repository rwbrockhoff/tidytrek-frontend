import { Heading, Button } from '@radix-ui/themes';
import { Segment } from '@/components/ui';
import { DeleteModal, TrashIcon } from '@/components/ui';

type DeleteAccountSectionProps = {
	onDeleteAccount: () => void;
};

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

export const DeleteAccountSection = ({ onDeleteAccount }: DeleteAccountSectionProps) => {
	return (
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
				onClickDelete={onDeleteAccount}>
				<div>
					<Button color="tomato" mt="4">
						<TrashIcon />
						Delete Account
					</Button>
				</div>
			</DeleteModal>
		</Segment>
	);
};
