import { type Pack } from '@/types/pack-types';
import { SaveIcon } from '@/components/ui';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackForm } from '../pack-form';
import { PackDelete } from '../pack-delete';

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
			<Dialog.Content style={{ maxWidth: '700px' }}>
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
							<SaveIcon />
							Save Pack
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
