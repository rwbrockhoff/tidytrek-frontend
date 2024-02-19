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

const ProfileForm = () => {
	const [showLinks, setShowLinks] = useState(false);

	const handleAddSocialLink = (service: string, socialLink: string) => {
		console.log('Please add: ', service, socialLink);
	};

	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Profile Settings</Header>
				<PhotoContainer>
					<Avatar
						src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						alt="profile photo"
					/>
					<Button $themeColor="primary">
						<Icon name="cloud upload" />
						Upload
					</Button>
				</PhotoContainer>
			</Segment>
			<Segment stacked>
				{/* <Header as="h4" style={{ marginBottom: 30 }}>
					Profile Info
				</Header> */}
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
				<p style={{ opacity: 0.5 }}>Add links that others can see on your profile.</p>
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
	width: 50%;
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
