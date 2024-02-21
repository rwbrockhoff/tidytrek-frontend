import {
	SegmentGroup,
	Segment as SemSegment,
	Header,
	Form,
	FormField,
	Input,
	TextArea,
	Icon,
	Message,
} from 'semantic-ui-react';
import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { Button } from '../../../shared/ui/SemanticUI';
import styled from 'styled-components';
import { ProfileSettings, SocialLink } from '../../../types/profileSettingsTypes';
import Avatar from '../../../shared/ui/Avatar';
import {
	setFormInput,
	InputEvent,
	TextAreaEvent,
	FormEvent,
} from '../../../shared/formHelpers';
import SocialLinks from './SocialLinks';
import { useHandlers } from '../../../views/Account/ProfileSettings/useHandlers';

type ProfileFormProps = {
	settings: ProfileSettings | undefined;
	socialLinks: SocialLink[];
};

const ProfileForm = (props: ProfileFormProps) => {
	const { settings, socialLinks } = props;

	const [userInfo, setUserInfo] = useState({ userBio: '', userLocation: '' });
	const [file, setFile] = useState<globalThis.File | null>();
	const formRef = useRef<HTMLFormElement | null>(null);

	const { handlers, mutations } = useHandlers();
	const { editProfile, deleteProfilePhoto } = handlers;
	const {
		uploadPhoto: { mutate, isPending: isUploadingPhoto, isError: isUploadError },
	} = mutations;

	useEffect(() => {
		if (settings) {
			const { userBio, userLocation } = settings;
			setUserInfo({ userBio, userLocation });
		}
	}, [settings]);

	const handleInput = (e: InputEvent | TextAreaEvent) => setFormInput(e, setUserInfo);

	const handleEditProfile = () => editProfile({ userBio, userLocation });

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			setFile(file);
		}
	};

	const handleSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append('profilePhoto', file);
			mutate(formData);
			formRef?.current && formRef.current.reset();
			setFile(null);
		}
	};

	const { userBio, userLocation } = userInfo;

	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Profile Settings</Header>
				<PhotoContainer>
					<Avatar
						src={settings?.profilePhotoUrl}
						margin="10px"
						onDelete={deleteProfilePhoto}
						isPending={isUploadingPhoto}
					/>
					<form ref={formRef} onSubmit={handleSubmitForm}>
						<Input type="file" accept="image/jpg, image/png" onChange={handleFile} />
						<Button
							$themeColor="primary"
							type="submit"
							disabled={isUploadingPhoto || !file}>
							<Icon name="cloud upload" />
							{isUploadingPhoto ? 'Uploading...' : 'Upload'}
						</Button>
					</form>

					{isUploadError && (
						<Message warning size="mini" style={{ marginRight: 'auto' }}>
							<Icon name="warning" /> We had an error uploading your photo. Oops!
						</Message>
					)}
				</PhotoContainer>
			</Segment>
			<Segment stacked>
				<StyledForm onBlur={handleEditProfile}>
					<FormField>
						<label>Based In</label>
						<Input
							name="userLocation"
							value={userLocation || ''}
							onChange={handleInput}
							placeholder="Denver, CO"
						/>
					</FormField>
					<FormField>
						<label>Profile Bio</label>
						<TextArea
							name="userBio"
							value={userBio || ''}
							onChange={handleInput}
							placeholder="Bio for your profile"
						/>
					</FormField>
				</StyledForm>

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
	width: 60%;
`;

const PhotoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: fit-content;
	align-items: center;
	justify-content: center;
	&&& {
		button {
			margin: 10px;
		}
	}
`;
