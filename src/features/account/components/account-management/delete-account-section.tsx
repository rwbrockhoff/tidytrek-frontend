import { Button } from '@/components/alpine';
import { Segment, SegmentHeader } from '@/components/primitives';
import { TrashIcon } from '@/components/icons';
import { DeleteModal } from '@/components/ui';

type DeleteAccountSectionProps = {
	onDeleteAccount: () => void;
};

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

export const DeleteAccountSection = ({ onDeleteAccount }: DeleteAccountSectionProps) => {
	return (
		<Segment>
			<SegmentHeader
				title="Delete Your Account"
				description="Deleting your account will permanently delete all of your packs. Be sure to save any important information first."
			/>
			<DeleteModal
				title="Delete Your Account"
				description={deleteMessage}
				onDelete={onDeleteAccount}>
				<div style={{ marginTop: '1rem' }}>
					<Button color="danger" variant="outline" iconLeft={<TrashIcon />}>
						Delete Account
					</Button>
				</div>
			</DeleteModal>
		</Segment>
	);
};
