import { Stack } from '@/components/layout';
import { Avatar } from '@/components/media';
import { Alert } from '@/components/ui';
import { Segment, SegmentHeader } from '@/components/primitives';
import {
	useUploadProfilePhotoMutation,
	useDeleteProfilePhotoMutation,
} from '@/queries/profile-settings-queries';

export const AvatarSettings = ({
	profilePhotoUrl,
}: {
	profilePhotoUrl: string | undefined;
}) => {
	const {
		mutate: uploadProfilePhoto,
		isPending: isUploadingPhoto,
		isError: isUploadError,
	} = useUploadProfilePhotoMutation();

	const { mutate: deleteProfilePhoto } = useDeleteProfilePhotoMutation();

	return (
		<Segment>
			<SegmentHeader 
				title="Profile Photo" 
				description="You can upload .jpg or .png photos." 
			/>
			<Stack className="justify-center w-max">
				<Avatar
					src={profilePhotoUrl}
					size="md"
					uploadEnabled
					onDelete={deleteProfilePhoto}
					isPending={isUploadingPhoto}
					onUpload={uploadProfilePhoto}
				/>

				{isUploadError && (
					<Alert
						variant="error"
						className="mt-4 mr-auto"
					>
						There was an error uploading your photo.
					</Alert>
				)}
			</Stack>
		</Segment>
	);
};
