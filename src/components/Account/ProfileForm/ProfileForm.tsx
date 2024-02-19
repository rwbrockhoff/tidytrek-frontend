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
import { useState } from 'react';
import { Button } from '../../../shared/ui/SemanticUI';
import styled from 'styled-components';
import { ProfileSettings, SocialLink } from '../../../types/profileSettingsTypes';
import { socialObject, SocialButton } from './SocialButton';

const defaultPhotoUrl =
	'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const ProfileForm = ({
	settings,
	socialLinks,
}: {
	settings: ProfileSettings | undefined;
	socialLinks: SocialLink[];
}) => {
	const [showLinks, setShowLinks] = useState(false);

	const { userBio, userLocation, profilePhotoUrl } = settings || {};

	const handleAddSocialLink = (service: string, socialLink: string) => {
		//mutation
	};

	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Profile Settings</Header>
				<PhotoContainer>
					<Avatar src={profilePhotoUrl || defaultPhotoUrl} alt="profile photo" />
					<Button $themeColor="primary">
						<Icon name="cloud upload" />
						Upload
					</Button>
				</PhotoContainer>
			</Segment>
			<Segment stacked>
				<StyledForm>
					<FormField>
						<label>Based In</label>
						<Input name="userLocation" placeholder="Denver, CO" />
					</FormField>
					<FormField>
						<label>Profile Bio</label>
						<TextArea name="userBio" placeholder="Bio for your profile" />
					</FormField>
				</StyledForm>
				<Text style={{ marginTop: 25 }}> Profile Links </Text>
				<p style={{ opacity: 0.5 }}>
					Add links that others can see on your profile. 4 link maximum to keep things
					tidy.
				</p>

				<CurrentLinksContainer>
					{socialLinks.map((link, index) => {
						const { socialName, color, icon } = socialObject[link.socialLinkName];
						const displayLink = shortenLink(link.socialLinkUrl);
						return (
							<SocialButton
								key={index}
								socialName={socialName}
								color={color}
								icon={icon}
								displayUrl={displayLink}
								onClick={() => console.log('clicked')}
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

				{showLinks && <AddLink addLink={handleAddSocialLink} />}
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

const Avatar = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50px;
	margin: 10px;
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

const shortenLink = (link: string) => {
	let slashIndex = link.lastIndexOf('/');
	return link.split('').splice(slashIndex).join('');
};
