import {
	SegmentGroup,
	Segment as SemSegment,
	Form,
	Input,
	TextArea,
	Icon,
	Message,
} from 'semantic-ui-react';
import { Header } from '../../../shared/ui/SemanticUI';
import { FormField } from '../../../shared/ui/SemanticUI';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProfileSettings, SocialLink } from '../../../types/profileTypes';
import Avatar from '../../../shared/ui/Avatar';
import { setFormInput, InputEvent, TextAreaEvent } from '../../../shared/formHelpers';
import SocialLinks from './SocialLinks';
import { useHandlers } from '../../../views/Account/ProfileSettings/useProfileHandlers';
import { mobile } from '../../../shared/mixins/mixins';

type ProfileFormProps = {
	settings: ProfileSettings | undefined;
	socialLinks: SocialLink[];
};

const ProfileForm = (props: ProfileFormProps) => {
	const { settings, socialLinks } = props;

	const [userInfo, setUserInfo] = useState({ userBio: '', userLocation: '' });

	const { handlers, mutations } = useHandlers();
	const { editProfile, deleteProfilePhoto } = handlers;
	const {
		uploadProfilePhoto: {
			mutate: uploadProfilePhoto,
			isPending: isUploadingPhoto,
			isError: isUploadError,
		},
	} = mutations;

	useEffect(() => {
		if (settings) {
			const { userBio, userLocation } = settings;
			setUserInfo({ userBio, userLocation });
		}
	}, [settings]);

	const handleInput = (e: InputEvent | TextAreaEvent) => setFormInput(e, setUserInfo);

	const handleEditProfile = () => editProfile({ userBio, userLocation });

	const { userBio, userLocation } = userInfo;
	const isMaxLengthBio = userBio && userBio.length >= 250;
	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4" $marginBottom="2rem">
					Profile Settings
				</Header>
				<PhotoContainer>
					<Avatar
						src={settings?.profilePhotoUrl}
						size="big"
						uploadEnabled
						onDelete={deleteProfilePhoto}
						isPending={isUploadingPhoto}
						onUpload={uploadProfilePhoto}
					/>

					{isUploadError && (
						<Message warning size="mini" style={{ marginRight: 'auto' }}>
							<Icon name="warning" /> We had an error uploading your photo. Oops!
						</Message>
					)}
				</PhotoContainer>
			</Segment>
			<Segment stacked>
				<StyledForm onBlur={handleEditProfile}>
					<FormField $width={'80%'}>
						<label>Based In</label>
						<Input
							name="userLocation"
							value={userLocation || ''}
							onChange={handleInput}
							placeholder="Denver, CO"
						/>
					</FormField>
					<FormField $width={'80%'}>
						<label>Profile Bio</label>
						<TextArea
							name="userBio"
							maxLength="250"
							value={userBio || ''}
							onChange={handleInput}
							placeholder="Bio for your profile"
						/>
					</FormField>
				</StyledForm>

				{isMaxLengthBio && (
					<StyledMessage warning>
						<Icon name="alarm" /> Woah there, partner. There's a 250 character limit to
						keep things tidy.
					</StyledMessage>
				)}

				<SocialLinks socialLinks={socialLinks} />
			</Segment>
		</SegmentGroup>
	);
};

export default ProfileForm;

export const Segment = styled(SemSegment)`
	&&& {
		padding: 35px 25px;
	}
}
`;

const StyledForm = styled(Form)`
	width: 70%;
	${mobile(`
		width: 100%;
	`)}
`;

const PhotoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: fit-content;
	justify-content: center;
	&&& {
		button {
			margin: 10px;
		}
	}
`;

const StyledMessage = styled(Message)`
	width: fit-content;
`;
