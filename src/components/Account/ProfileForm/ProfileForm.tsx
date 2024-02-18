import {
	SegmentGroup,
	Segment as SemSegment,
	Header,
	Form,
	FormField,
	Input,
	TextArea,
} from 'semantic-ui-react';
import styled from 'styled-components';

const ProfileForm = () => {
	return (
		<SegmentGroup>
			<Segment>
				<Header as="h4">Profile</Header>
				<Form>
					<FormField>
						<label>Based In</label>
						<Input name="userLocation" placeholder="Denver, CO" />
					</FormField>
					<FormField>
						<label>Profile Bio</label>
						<TextArea name="userBio" placeholder="Bio for your profile" />
					</FormField>
				</Form>
			</Segment>
			<Segment stacked>
				<Header as="h4">Other Info</Header>
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
