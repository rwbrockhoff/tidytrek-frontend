import { useParams, useNavigate } from 'react-router-dom';
import { type Pack } from '@/types/pack-types';
import { Heading, Tabs } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { SaveIcon, BackArrow, BackpackIcon, SettingsIcon } from '@/components/icons';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackInfoForm } from '../../components/pack-form/pack-info-form';
import { PackSettingsForm } from '../../components/pack-form/pack-settings-form';
import { PackDelete } from '../../components/pack-delete/pack-delete';
import { useGetPackQuery } from '@/queries/pack-queries';
import { Spinner } from '@/components/primitives';
import { Box, Stack, Flex } from '@/components/layout';
import { mx, cn } from '@/styles/utils';
import { decode } from '@/utils';
import { useState } from 'react';

export const PackEdit = () => {
	const { packId } = useParams<{ packId: string }>();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('info');

	const decodedPackId = packId ? decode(packId) : null;
	const { data: packData, isLoading, error } = useGetPackQuery(decodedPackId);
	const pack = packData?.pack;

	const {
		modifiedPack,
		handleFormChange,
		handleCheckBox,
		handlePaletteChange,
		handleSubmitPack,
		formErrors,
	} = usePackForm(pack || ({} as Pack));

	const handleSave = () => {
		handleSubmitPack();
		navigate(`/pack/${packId}`);
	};

	const handleCancel = () => {
		navigate(`/pack/${packId}`);
	};

	if (isLoading) return <Spinner />;
	if (error || !pack) return <div>Pack not found</div>;

	return (
		<Box className="mx-auto pb-2">
			<Box>
				<Button variant="ghost" onClick={handleCancel} iconLeft={<BackArrow />}>
					Back
				</Button>
			</Box>
			<Box className={cn(mx.textCenter, 'mb-8')}>
				<Heading size="6">Edit Pack</Heading>
			</Box>

			<Tabs.Root value={activeTab} onValueChange={setActiveTab}>
				<Tabs.List size="2" className="m-2 gap-4 text-lg">
					<Tabs.Trigger value="info">
						<Flex className="items-center gap-2 py-2">
							<BackpackIcon />
							Pack Info
						</Flex>
					</Tabs.Trigger>
					<Tabs.Trigger value="settings">
						<Flex className="items-center gap-2 py-2">
							<SettingsIcon />
							Pack Settings
						</Flex>
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="info">
					<PackInfoForm
						pack={pack}
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
					/>
				</Tabs.Content>
			</Tabs.Root>

			<Stack className="gap-4 mt-6">
				<Button onClick={handleSave}>
					<SaveIcon />
					Save Pack
				</Button>

				<PackDelete pack={pack} />
			</Stack>
		</Box>
	);
};
