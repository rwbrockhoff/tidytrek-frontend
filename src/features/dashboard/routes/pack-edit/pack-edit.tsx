import { useParams, useNavigate } from 'react-router-dom';
import { type Pack } from '@/types/pack-types';
import { Heading } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { SaveIcon, BackArrow } from '@/components/icons';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackForm } from '../../components/pack-form/pack-form';
import { PackDelete } from '../../components/pack-delete/pack-delete';
import { useGetPackQuery } from '@/queries/pack-queries';
import { Spinner } from '@/components/primitives';
import { Box, Stack } from '@/components/layout';
import { mx } from '@/styles/utils';
import { decode } from '@/utils';

export const PackEdit = () => {
	const { packId } = useParams<{ packId: string }>();
	const navigate = useNavigate();

	const decodedPackId = packId ? decode(packId) : null;
	const { data: packData, isLoading, error } = useGetPackQuery(decodedPackId);
	const pack = packData?.pack;

	const { modifiedPack, handleFormChange, handleCheckBox, handleSubmitPack } =
		usePackForm(pack || ({} as Pack));

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
		<Box className="mx-auto pt-3">
			<Box>
				<Button variant="ghost" onClick={handleCancel} iconLeft={<BackArrow />}>
					Back
				</Button>
			</Box>
			<Box className={mx.textCenter}>
				<Heading size="5">Edit Pack</Heading>
			</Box>

			<PackForm
				pack={modifiedPack}
				handleFormChange={handleFormChange}
				handleCheckBox={handleCheckBox}
			/>

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
