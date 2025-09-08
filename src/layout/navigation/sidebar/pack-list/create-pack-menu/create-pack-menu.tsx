import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './create-pack-menu.module.css';
import { PlusIcon, ImportIcon } from '@/components/icons';
import { useAddNewPackMutation } from '@/queries/pack-queries';
import { Popover } from '@radix-ui/themes';
import { PopoverMenu, PopoverMenuItem } from '@/components/ui/popover-menu';
import { Button } from '@/components/alpine';
import { encode } from '@/utils';
import { ImportPackDialog } from './import-pack-dialog/import-pack-dialog';
import { UpgradePlanModal } from './upgrade-plan-modal';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { useGetPackListQuery } from '@/queries/pack-queries';

export const CreatePackMenu = () => {
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();
	const { isSubscribed } = useSubscriptionDetails();

	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const [showImportDialog, setShowImportDialog] = useState(false);

	const addNewPackData = useAddNewPackMutation();
	const { mutate: addPack } = addNewPackData;

	const packListQuery = useGetPackListQuery();
	const { data: packList } = packListQuery;

	useEffect(() => {
		// subscribe to new pack created event, redirect to new pack
		if (addNewPackData.isSuccess && addNewPackData.data?.pack) {
			const { packId } = addNewPackData.data.pack;
			const encodedId = encode(packId);
			// Only navigate if we're not already on this pack's page
			if (paramPackId !== encodedId) {
				addNewPackData.reset();
				navigate(`/pack/${encodedId}`, { viewTransition: true });
			}
		}
	}, [addNewPackData, paramPackId, navigate]);

	const handleCreatePack = () => {
		if (!isSubscribed && packList?.packList && packList.packList.length >= 1) {
			setShowUpgradeModal(true);
			return;
		}
		addPack();
	};

	const handleImportPack = () => {
		if (!isSubscribed && packList?.packList && packList.packList.length >= 1) {
			setShowUpgradeModal(true);
			return;
		}
		setShowImportDialog(true);
	};

	return (
		<>
			<PopoverMenu
				trigger={
					<Button
						variant="ghost"
						color="secondary"
						className={styles.newPackButton}
						aria-label="Open pack creation menu">
						<PlusIcon />
						Create New Pack
					</Button>
				}>
				<Popover.Close>
					<PopoverMenuItem
						icon={<PlusIcon />}
						label="Create New Pack"
						onClick={handleCreatePack}
					/>
				</Popover.Close>

				<Popover.Close>
					<PopoverMenuItem
						icon={<ImportIcon />}
						label="Import Pack"
						onClick={handleImportPack}
					/>
				</Popover.Close>
			</PopoverMenu>

			<UpgradePlanModal
				isOpen={showUpgradeModal}
				onClose={() => setShowUpgradeModal(false)}
				message="Join today to create unlimited packs."
			/>

			<ImportPackDialog
				isOpen={showImportDialog}
				onClose={() => setShowImportDialog(false)}
			/>
		</>
	);
};
