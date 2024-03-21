import { PackPhoto } from '@/components';
import { SubText } from '@/components/ui/TidyUI';
import {
	useDeletePackPhotoMutation,
	useUploadPackPhotoMutation,
} from '@/queries/pack-queries';
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
		<RightPanel>
			<label style={{ fontWeight: 700, fontSize: '0.95em' }}>Pack Photo</label>
			<SubText>Upload a .jpg or .png file.</SubText>
			<PackPhoto
				src={packPhotoUrl}
				uploadEnabled={!photoPending}
				isPending={photoPending}
				onUpload={handleUploadPhoto}
				onDelete={handleDeletePhoto}
			/>
		</RightPanel>
	);
};

const RightPanel = styled.div`
	width: 45%;
	padding-top: 0;
	position: absolute;
	z-index: 1;
	right: calc(1.5rem + 10px);
	top: 1.5rem;
`;
