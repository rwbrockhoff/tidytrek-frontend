import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Segment, SegmentGroup, WarningMessage } from '@/components/ui';
import { Flex } from '@radix-ui/themes';
import { Form, Input, TextArea } from 'semantic-ui-react';
import { Header, FormField } from '@/components/ui/SemanticUI';
import { SubText } from '@/components/ui/TidyUI';
import { Avatar } from '@/components/ui';
import { setFormInput } from '@/utils';
import { SocialLinks } from './social-links';
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
			setUserInfo({ userBio, userLocation, username, trailName });
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

	const isMaxLengthBio = userBio && userBio.length >= 250;

	const errorMessage = isError && useAxiosErrorMessage(error);

	return (
		<SegmentGroup direction="column">
			<Segment>
				<Header as="h4" $marginBottom="2rem">
					Profile Settings
				</Header>

				<PhotoContainer direction="column" justify="center">
					<Header as="h5" $marginBottom="0">
						Avatar
					</Header>
					<SubText>You can upload .jpg or .png photos.</SubText>
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
				</PhotoContainer>
			</Segment>
			<Segment>
				<StyledForm onBlur={handleEditProfile}>
					<FormField $width={inputWidth} error={isError}>
						<label>Username</label>
						<Input
							name="username"
							value={username || ''}
							onChange={handleInput}
							placeholder=""
						/>
						{isError && <label>{errorMessage}</label>}
					</FormField>
					<FormField $width={inputWidth}>
						<label>Trail Name</label>
						<Input
							name="trailName"
							value={trailName || ''}
							onChange={handleInput}
							placeholder=""
						/>
					</FormField>
					<FormField $width={inputWidth}>
						<label>Based In</label>
						<Input
							name="userLocation"
							value={userLocation || ''}
							onChange={handleInput}
							placeholder="Denver, CO"
						/>
					</FormField>
					<FormField $width={inputWidth}>
						<label>Profile Bio</label>
						<TextArea
							name="userBio"
							maxLength="250"
							value={userBio || ''}
							onChange={handleInput}
							placeholder="Bio for your profile"
						/>
					</FormField>
					{isMaxLengthBio && (
						<WarningMessage mt="4" width={inputWidth} message={warningMessage} />
					)}
				</StyledForm>

				<SocialLinks socialLinks={socialLinks} />
			</Segment>
		</SegmentGroup>
	);
};

const StyledForm = styled(Form)`
	width: 70%;
	${({ theme: t }) =>
		t.mx.mobile(`
		width: 100%;
	`)}
`;

const PhotoContainer = styled(Flex)`
	width: fit-content;
	&&& {
		button {
			margin: 10px;
		}
	}
`;

// defaults
const inputWidth = '80%';
const warningMessage = `Woah there, partner. There's a 250 character limit to keep things tidy.`;
