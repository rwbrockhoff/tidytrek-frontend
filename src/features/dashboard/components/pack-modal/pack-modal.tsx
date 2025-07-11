import { type Pack } from '@/types/pack-types';
import styles from './pack-modal.module.css';
import { SaveIcon, CloseIcon } from '@/components/ui';
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackForm } from '../pack-form/pack-form';
import { PackDelete } from '../pack-delete/pack-delete';

type PackModalProps = {
	children: React.ReactNode;
	pack: Pack;
};

export const PackModal = (props: PackModalProps) => {
	const { children, pack } = props;

	const { modifiedPack, handleFormChange, handleCheckBox, handleSubmitPack } =
		usePackForm(pack);

	const { packName } = modifiedPack;

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<div>{children}</div>
			</Dialog.Trigger>
			<Dialog.Content className={styles.dialogContent}>
				<Dialog.Close>
					<IconButton
						variant="ghost"
						color="gray"
						size="2"
						className={styles.closeModalButton}
						aria-label="Close modal">
						<CloseIcon />
					</IconButton>
				</Dialog.Close>

				<Dialog.Title mt="2" mb="1" ml="4">
					{packName ?? pack.packName ?? 'Pack'}
				</Dialog.Title>
				<Dialog.Description size="2" color="gray" mb="4" ml="4">
					Edit pack details, settings, and photo
				</Dialog.Description>

				<PackForm
					pack={modifiedPack}
					handleFormChange={handleFormChange}
					handleCheckBox={handleCheckBox}
				/>

				<Flex justify="end" gap="3" mt="2" mx="4" mb="2">
					<PackDelete pack={pack} />

					<Dialog.Close>
						<Button onClick={handleSubmitPack}>
							<SaveIcon size={16} />
							Save Pack
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
