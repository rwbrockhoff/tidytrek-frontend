import {
	SegmentGroup,
	Segment as SemSegment,
	Header,
	Form,
	FormField,
	Input,
	TextArea,
	Icon,
} from 'semantic-ui-react';
import AddLink from './AddLink';
import { useState, useEffect } from 'react';
import { Button } from '../../../shared/ui/SemanticUI';
import styled from 'styled-components';
import { ProfileSettings, SocialLink } from '../../../types/profileSettingsTypes';
import { SocialButton } from './SocialButton';
import socialMediaUI from '../../../shared/ui/SocialMediaUI';
import Avatar from '../../../shared/ui/Avatar';
import { type UserInfo } from '../../../views/Account/ProfileSettings/ProfileSettings';
import { setFormInput, InputEvent, TextAreaEvent } from '../../../shared/formHelpers';

type ProfileFormProps = {
	settings: ProfileSettings | undefined;
	socialLinks: SocialLink[];
	isPending: boolean;
	addLink: (service: string, socialLink: string) => void;
	deleteLink: (socialLinkId: number | undefined) => void;
	editProfile: (userInfo: UserInfo) => void;
};

const ProfileForm = (props: ProfileFormProps) => {
	const { settings, socialLinks, isPending, addLink, deleteLink, editProfile } = props;

	const [showLinks, setShowLinks] = useState(false);
	const [userInfo, setUserInfo] = useState({ userBio: '', userLocation: '' });

	useEffect(() => {
		if (settings) {
			const { userBio, userLocation } = settings;
			setUserInfo({ userBio, userLocation });
		}
	}, [settings]);

	const handleInput = (e: InputEvent | TextAreaEvent) => setFormInput(e, setUserInfo);

	const handleEditProfile = () => editProfile({ userBio, userLocation });

	const { userBio, userLocation } = userInfo;

	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Profile Settings</Header>
				<PhotoContainer>
					<Avatar src={settings?.profilePhotoUrl} />

					<Button $themeColor="primary">
						<Icon name="cloud upload" />
						Upload
					</Button>
				</PhotoContainer>
			</Segment>
			<Segment stacked>
				<StyledForm onBlur={handleEditProfile}>
					<FormField>
						<label>Based In</label>
						<Input
							name="userLocation"
							value={userLocation}
							onChange={handleInput}
							placeholder="Denver, CO"
						/>
					</FormField>
					<FormField>
						<label>Profile Bio</label>
						<TextArea
							name="userBio"
							value={userBio}
							onChange={handleInput}
							placeholder="Bio for your profile"
						/>
					</FormField>
				</StyledForm>
				<Text style={{ marginTop: 25 }}> Profile Links </Text>
				<p style={{ opacity: 0.5 }}>
					Add links that others can see on your profile. 4 link maximum to keep things
					tidy.
				</p>

				<CurrentLinksContainer>
					{socialLinks.map((link, index) => {
						const { socialName, color, icon } = socialMediaUI[link.socialLinkName];
						const { socialLinkId: id } = link;
						return (
							<SocialButton
								key={index}
								socialLinkId={id}
								socialName={socialName}
								color={color}
								icon={icon}
								socialLinkUrl={link.socialLinkUrl}
								linkEnabled
								deleteEnabled
								onDelete={() => deleteLink(id)}
							/>
						);
					})}
				</CurrentLinksContainer>

				{!showLinks && (
					<Button
						basic
						$themeColor="primary"
						style={{ margin: '10px 0px' }}
						onClick={() => setShowLinks(true)}>
						<Icon name="add" />
						Add Link
					</Button>
				)}

				{showLinks && <AddLink addLink={addLink} isPending={isPending} />}
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

const Text = styled.p`
	display: block;
	margin: 0 0 0.28571429rem 0;
	color: rgba(0, 0, 0, 0.87);
	font-size: 0.92857143em;
	font-weight: 700;
	text-transform: none;
	margin-top: 15px;
`;

const CurrentLinksContainer = styled.div`
	display: flex;
	margin-bottom: 25px;
	&&& {
		div.ui.label {
			margin: 5px 0px;
			margin-right: 10px;
		}
	}
`;
