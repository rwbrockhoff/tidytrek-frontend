import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './create-pack-menu.module.css';
import { PlusIcon, ImportIcon } from '@/components/icons';
import { useAddNewPackMutation } from '@/queries/pack-queries';
import { Popover } from '@radix-ui/themes';
import { PopoverMenu, PopoverMenuItem } from '@/components/ui/popover-menu';
import { Button } from '@/components/alpine';
import { encode } from '@/utils';
import { ImportPackDialog } from './import-pack-dialog/import-pack-dialog';

export const CreatePackMenu = () => {
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();

	const addNewPackData = useAddNewPackMutation();
	const { mutate: addPack } = addNewPackData;

	useEffect(() => {
		// subscribe to new pack created event, redirect to new pack
		if (addNewPackData.isSuccess && addNewPackData.data?.pack) {
			const { packId } = addNewPackData.data.pack;
			const encodedId = encode(packId);
			// Only navigate if we're not already on this pack's page
			if (paramPackId !== encodedId) {
				addNewPackData.reset();
				navigate(`/pack/${encodedId}`);
			}
		}
	}, [addNewPackData, paramPackId, navigate]);

	return (
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
					onClick={() => addPack()}
				/>
			</Popover.Close>

			<ImportPackDialog>
				<PopoverMenuItem icon={<ImportIcon />} label="Import Pack" />
			</ImportPackDialog>
		</PopoverMenu>
	);
};
