import { Heading, Flex, Text } from '@radix-ui/themes';
import { Avatar } from '@/components/ui';
import { Segment, WarningMessage } from '@/components/ui';
import { useProfileActions } from '../../hooks/use-profile-actions';

export const AvatarSettings = ({
	profilePhotoUrl,
}: {
	profilePhotoUrl: string | undefined;
}) => {
	const {
		deleteProfilePhoto,
		mutations: {
			uploadProfilePhoto: {
				mutate: uploadProfilePhoto,
				isPending: isUploadingPhoto,
				isError: isUploadError,
			},
		},
	} = useProfileActions();

	return (
		<Segment>
			<Heading as="h4" size="3" mb="4">
				Profile Settings
			</Heading>

			<Flex direction="column" justify="center" width="max-content">
				<Heading as="h5" size="3">
					Avatar
				</Heading>
				<Text size="2" color="gray" mt="1" mb="4">
					You can upload .jpg or .png photos.
				</Text>
				<Avatar
					src={profilePhotoUrl}
					size="big"
					uploadEnabled
					onDelete={deleteProfilePhoto}
					isPending={isUploadingPhoto}
					onUpload={uploadProfilePhoto}
				/>

				{isUploadError && (
					<WarningMessage
						message="We had an error uploading your photo. Oops!"
						mt="4"
						mr="auto"
					/>
				)}
			</Flex>
		</Segment>
	);
};
