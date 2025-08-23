import { type Pack } from '@/types/pack-types';
import styles from './pack-modal.module.css';
import { Dialog, Tabs } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { SaveIcon, CloseIcon, BackpackIcon, SettingsIcon } from '@/components/icons';
import { Button, Alert } from '@/components/alpine';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackInfoForm } from '../pack-form/pack-info-form';
import { PackSettingsForm } from '../pack-form/pack-settings-form';
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
	const [activeTab, setActiveTab] = useState('info');

	const { data: queryData } = useGetPackQuery(pack.packId, { enabled: isOpen });
	const currentPack = queryData?.pack || pack;

	const {
		modifiedPack,
		handleFormChange,
		handleCheckBox,
		handlePaletteChange,
		handleSubmitPack,
		formErrors,
		serverError,
	} = usePackForm(pack);

	const { packName } = modifiedPack;

	const handleSaveAndClose = async () => {
		const success = await handleSubmitPack();
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

				<Dialog.Title mt="2" mb="1" ml="2">
					{packName ?? pack.packName ?? 'Pack'}
				</Dialog.Title>
				<Dialog.Description size="2" color="gray" mb="4" ml="2">
					Edit pack details, settings, and photo
				</Dialog.Description>

				<Tabs.Root value={activeTab} onValueChange={setActiveTab}>
					<Tabs.List size="2" className="m-2">
						<Tabs.Trigger value="info">
							<Flex className="items-center gap-2">
								<BackpackIcon />
								Pack Info
							</Flex>
						</Tabs.Trigger>
						<Tabs.Trigger value="settings">
							<Flex className="items-center gap-2">
								<SettingsIcon />
								Pack Settings
							</Flex>
						</Tabs.Trigger>
					</Tabs.List>

					<Tabs.Content value="info">
						<PackInfoForm
							pack={{ ...modifiedPack, packPhotoUrl: currentPack.packPhotoUrl }}
							handleFormChange={handleFormChange}
							handleCheckBox={handleCheckBox}
							formErrors={formErrors}
						/>
					</Tabs.Content>

					<Tabs.Content value="settings">
						<PackSettingsForm
							pack={modifiedPack}
							handleFormChange={handleFormChange}
							handleCheckBox={handleCheckBox}
							onPaletteChange={handlePaletteChange}
							formErrors={formErrors}
						/>
					</Tabs.Content>
				</Tabs.Root>

				{serverError.error && (
					<Alert variant="error" className="mt-4 mb-8">
						{serverError.message}
					</Alert>
				)}

				<Flex className="justify-end gap-3 mt-4 px-2">
					<PackDelete pack={pack} />

					<Button onClick={handleSaveAndClose} iconLeft={<SaveIcon />}>
						Save Pack
					</Button>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
