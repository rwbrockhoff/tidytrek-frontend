import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, FormField, FormMessage, FormLabel } from '@radix-ui/react-form';
import { TextField, TextArea, Heading, Text, Flex } from '@radix-ui/themes';
import { Segment, SegmentGroup, WarningMessage } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { setFormInput } from '@/utils';
import { SocialLinks } from './social-links';
import { FormField as CustomFormField } from '@/components/ui';
import { useHandlers } from '../../hooks/use-profile-handlers';
import { useAxiosErrorMessage } from '@/hooks/use-axios-error';

type ProfileFormProps = {
	profileInfo: ProfileInfo | undefined;
	socialLinks: SocialLink[];
};

export const ProfileForm = (props: ProfileFormProps) => {
	const { profileInfo, socialLinks } = props;

	const [isProfileChanged, setIsProfileChanged] = useState(false);
	const [userInfo, setUserInfo] = useState({
		userBio: '',
		userLocation: '',
		username: '',
		trailName: '',
	});

	const { handlers, mutations } = useHandlers();
	const { deleteProfilePhoto } = handlers;
	const {
		uploadProfilePhoto: {
			mutate: uploadProfilePhoto,
			isPending: isUploadingPhoto,
			isError: isUploadError,
		},
		editProfile: { mutate: editProfile, error, isError },
	} = mutations;

	useEffect(() => {
		if (profileInfo) {
			const { userBio, userLocation, username, trailName } = profileInfo;
			setUserInfo({
				userBio: userBio || '',
				userLocation: userLocation || '',
				username: username || '',
				trailName: trailName || '',
			});
		}
	}, [profileInfo]);

	const handleInput = (e: InputEvent | TextAreaEvent) => {
		if (!isProfileChanged) setIsProfileChanged(true);
		setFormInput(e, setUserInfo);
	};

	const handleEditProfile = () => {
		if (isProfileChanged) editProfile(userInfo);
	};

	const { userBio, userLocation, username, trailName } = userInfo;

	const isMaxLengthBio = userBio && userBio.length >= maxLength;

	const errorMessage = isError && useAxiosErrorMessage(error);

	return (
		<SegmentGroup direction="column">
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
						src={profileInfo?.profilePhotoUrl}
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
			<Segment>
				<StyledForm onBlur={handleEditProfile}>
					<FormField name="username" style={{ marginBottom: '1em' }}>
						<FormLabel>
							<Text size="2" weight="bold" ml="2" color="gray">
								Username
							</Text>
						</FormLabel>

						<TextField.Input
							name="username"
							data-invalid={isError}
							value={username}
							onChange={handleInput}
							radius="small"
							size="3"
							mb="0"
							placeholder="Username"
						/>

						{isError && (
							<FormMessage>
								<Text ml="2" color="tomato" weight="light">
									{errorMessage}
								</Text>
							</FormMessage>
						)}
					</FormField>

					<CustomFormField
						name="trailName"
						value={trailName}
						placeholder="Trail Name"
						onChange={handleInput}
						label="Trail Name"
					/>

					<CustomFormField
						name="userLocation"
						value={userLocation}
						placeholder="Durango, Colorado"
						onChange={handleInput}
						label="Based In"
					/>

					<FormField name="userBio">
						<FormLabel>
							<Text size="2" weight="bold" ml="2" color="gray">
								Profile Bio
							</Text>
						</FormLabel>

						<TextArea
							name="userBio"
							value={userBio}
							size="3"
							mb="3"
							maxLength={maxLength}
							placeholder="Bio for your profile"
							onChange={handleInput}
						/>

						{isMaxLengthBio && (
							<FormMessage>
								<Text mt="4" color="tomato" weight="light">
									{warningMessage}
								</Text>
							</FormMessage>
						)}
					</FormField>
				</StyledForm>
			</Segment>
			<Segment>
				<SocialLinks socialLinks={socialLinks} />
			</Segment>
		</SegmentGroup>
	);
};

const StyledForm = styled(Form)`
	width: 60%;
	${({ theme: t }) =>
		t.mx.mobile(`
		width: 100%;
	`)}
`;

// defaults
const maxLength = 250;
const warningMessage = `Woah there, partner. There's a 250 character limit to keep things tidy.`;
