import { PackPhoto } from '@/components';
import {
	useDeletePackPhotoMutation,
	useUploadPackPhotoMutation,
} from '@/queries/pack-queries';
import { Flex, Text } from '@radix-ui/themes';
import styled from 'styled-components';

type PackPhotoPanel = {
	packPhotoUrl: string;
	packId: number;
};

export const PackPhotoPanel = ({ packPhotoUrl, packId }: PackPhotoPanel) => {
	const { mutate: uploadPackPhoto, isPending: isPendingUpload } =
		useUploadPackPhotoMutation();
	const { mutate: deletePackPhoto, isPending: isPendingDelete } =
		useDeletePackPhotoMutation();

	const handleUploadPhoto = (formData: FormData) => {
		uploadPackPhoto({ packId, formData });
	};

	const handleDeletePhoto = () => {
		deletePackPhoto(packId);
	};

	const photoPending = isPendingUpload || isPendingDelete;
	return (
		<RightPanel direction="column">
			<Text size="2" weight="bold" color="gray">
				Pack Photo
			</Text>
			<Text size="2" color="gray" mb="2">
				Upload a .jpg or .png file.
			</Text>
			<PackPhoto
				src={packPhotoUrl}
				packId={packId}
				uploadEnabled={!photoPending}
				isPending={photoPending}
				onUpload={handleUploadPhoto}
				onDelete={handleDeletePhoto}
			/>
		</RightPanel>
	);
};

const RightPanel = styled(Flex)`
	width: 45%;
	position: absolute;
	z-index: 1;
	right: 1em;
	top: 1em;
`;
