import { type Pack } from '@/types/pack-types';
import styles from './pack-modal.module.css';
import { Dialog } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { SaveIcon, CloseIcon } from '@/components/icons';
import { Button } from '@/components/alpine';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackForm } from '../pack-form/pack-form';
import { PackDelete } from '../pack-delete/pack-delete';
import { useState } from 'react';
import { useGetPackQuery } from '@/queries/pack-queries';

type PackModalProps = {
	children: React.ReactNode;
	pack: Pack;
	onClose?: () => void;
};

export const PackModal = (props: PackModalProps) => {
	const { children, pack, onClose } = props;
	const [isOpen, setIsOpen] = useState(false);

	const { data: queryData } = useGetPackQuery(pack.packId);
	const currentPack = queryData?.pack || pack;

	const { modifiedPack, handleFormChange, handleCheckBox, handleSubmitPack, formErrors } =
		usePackForm(pack);

	const { packName } = modifiedPack;

	const handleSaveAndClose = () => {
		const success = handleSubmitPack();
		if (success) {
			setIsOpen(false);
		}
	};

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (!open && onClose) {
					onClose();
				}
			}}>
			<Dialog.Trigger>{children}</Dialog.Trigger>
			<Dialog.Content className={styles.dialogContent}>
				<Dialog.Close>
					<Button
						variant="ghost"
						size="md"
						className={styles.closeModalButton}
						aria-label="Close modal"
						iconLeft={<CloseIcon />}
					/>
				</Dialog.Close>

				<Dialog.Title mt="2" mb="1" ml="4">
					{packName ?? pack.packName ?? 'Pack'}
				</Dialog.Title>
				<Dialog.Description size="2" color="gray" mb="4" ml="4">
					Edit pack details, settings, and photo
				</Dialog.Description>

				<PackForm
					pack={{ ...modifiedPack, packPhotoUrl: currentPack.packPhotoUrl }}
					handleFormChange={handleFormChange}
					handleCheckBox={handleCheckBox}
					formErrors={formErrors}
				/>

				<Flex className="justify-end gap-3 my-2">
					<PackDelete pack={pack} />

					<Button onClick={handleSaveAndClose} iconLeft={<SaveIcon />}>
						Save Pack
					</Button>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
