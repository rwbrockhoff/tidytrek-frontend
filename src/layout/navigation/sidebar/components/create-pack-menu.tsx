import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './create-pack-menu.module.css';
import { PlusIcon, ImportIcon } from '@/components/ui';
import { useAddNewPackMutation } from '@/queries/pack-queries';
import { Flex, Popover } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { encode } from '@/utils';
import { ImportPackDialog } from './import-pack-dialog';

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
		<Popover.Root>
			<Popover.Trigger>
				<Button
					variant="ghost"
					color="gray"
					className={styles.newPackButton}
					aria-label="Open pack creation menu">
					<PlusIcon />
					Create New Pack
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<Flex direction="column" gap="2">
					<Popover.Close>
						<Button
							variant="ghost"
							onClick={() => addPack()}
							aria-label="Create a new empty pack"
							className={styles.menuButton}>
							<Flex display="inline-flex" align="center" justify="start" gap="2">
								<PlusIcon />
								Create New Pack
							</Flex>
						</Button>
					</Popover.Close>

					<ImportPackDialog>
						<Button
							variant="ghost"
							aria-label="Import pack from Lighterpack"
							className={styles.menuButton}
							iconLeft={<ImportIcon />}>
							Import Pack
						</Button>
					</ImportPackDialog>
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
