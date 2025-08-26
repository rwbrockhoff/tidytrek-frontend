import { Button } from '@/components/alpine';
import { Segment, SegmentHeader } from '@/components/primitives';
import { TrashIcon } from '@/components/icons';
import { DeleteAccountModal } from './delete-account-modal';

export const DeleteAccountSection = () => {
	return (
		<Segment>
			<SegmentHeader
				title="Delete Your Account"
				description="Deleting your account will permanently delete all of your packs. Be sure to save any important information first."
			/>
			<DeleteAccountModal>
				<Button color="danger" variant="outline" iconLeft={<TrashIcon />}>
					Delete Account
				</Button>
			</DeleteAccountModal>
		</Segment>
	);
};
