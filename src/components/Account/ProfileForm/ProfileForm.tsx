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
import { SocialButton } from './SocialButton';
import socialMediaUI from '../../../shared/ui/SocialMediaUI';
import {
	useAddSocialLinkMutation,
	useDeleteSocialLinkMutation,
} from '../../../queries/userProfileQueries';
import Avatar from '../../../shared/ui/Avatar';
import { cleanUpLink } from '../../../shared/ui/CustomLinks';

const ProfileForm = ({
	settings,
	socialLinks,
}: {
	settings: ProfileSettings | undefined;
	socialLinks: SocialLink[];
}) => {
	const { mutate: addSocialLink, isPending } = useAddSocialLinkMutation();
	const { mutate: deleteSocialLink, isPending: isPendingDeleteItem } =
		useDeleteSocialLinkMutation();

	const [showLinks, setShowLinks] = useState(false);

	const { profilePhotoUrl } = settings || {};

	const handleAddSocialLink = (service: string, socialLink: string) => {
		const cleanLink = cleanUpLink(socialLink);
		addSocialLink({ service, socialLink: cleanLink });
	};

	const handleDeleteSocialLink = (socialLinkId: number | undefined) => {
		if (socialLinkId && !isPendingDeleteItem) deleteSocialLink(socialLinkId);
	};

	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Profile Settings</Header>
				<PhotoContainer>
					<Avatar src={profilePhotoUrl} />

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
						const { socialName, color, icon } = socialMediaUI[link.socialLinkName];

						return (
							<SocialButton
								key={index}
								socialLinkId={link.socialLinkId}
								socialName={socialName}
								color={color}
								icon={icon}
								socialLinkUrl={link.socialLinkUrl}
								linkEnabled
								deleteEnabled
								onDelete={handleDeleteSocialLink}
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

				{showLinks && <AddLink addLink={handleAddSocialLink} isPending={isPending} />}
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
