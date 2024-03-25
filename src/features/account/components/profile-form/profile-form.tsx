import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import { Button, Flex } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import { Message, SaveIcon, Segment, SegmentGroup } from '@/components/ui';
import { z, usernameSchema, basicInputSchema } from '@/schemas';
import { setFormInput } from '@/utils';
import { SocialLinks } from './social-links';
import { FormField, FormTextArea } from '@/components/ui';
import { useHandlers } from '../../hooks/use-profile-handlers';
import { useMutationErrors } from '@/hooks/use-axios-error';

import { AvatarSettings } from './avatar-settings';

import { useZodError } from '@/hooks';

type ProfileFormProps = {
	profileInfo: ProfileInfo | undefined;
	socialLinks: SocialLink[];
};

const maxLength = 250;

const userBioSchema = z.string().trim().max(maxLength, {
	message: `Woah there, partner. There's a 250 character limit to keep things tidy.`,
});

const formSchema = z.object({
	username: usernameSchema,
	userBio: userBioSchema,
	trailName: basicInputSchema('Trail Name'),
	userLocation: basicInputSchema('Location'),
});

export const ProfileForm = (props: ProfileFormProps) => {
	const { profileInfo, socialLinks } = props;

	const [isProfileChanged, setIsProfileChanged] = useState(false);
	const [userInfo, setUserInfo] = useState({
		userBio: '',
		userLocation: '',
		username: '',
		trailName: '',
	});

	const {
		editProfile: { mutateAsync: editProfile, isSuccess, reset: resetEditProfileState },
	} = useHandlers().mutations;

	const { serverError, updateAxiosError, resetAxiosError } = useMutationErrors();
	const { formErrors, updateFormErrors, resetFormErrors } = useZodError([
		'username',
		'userBio',
		'trailName',
		'userLocation',
	]);

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
		handleClearErrors(e);
		resetEditProfileState();
	};

	const handleClearErrors = (e: InputEvent | TextAreaEvent) => {
		if (formErrors[e.target.name] && formErrors[e.target.name].error)
			resetFormErrors(e.target.name);
		if (serverError.error) resetAxiosError();
	};

	const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = formSchema.safeParse(userInfo);
			if (!data.success) {
				const result = JSON.parse(data.error.message);
				return updateFormErrors(result);
			} else editProfile(userInfo);
		} catch (err) {
			updateAxiosError(err);
		}
	};

	const { userBio, userLocation, username, trailName } = userInfo;
	const { profilePhotoUrl } = profileInfo || {};

	return (
		<SegmentGroup direction="column">
			<AvatarSettings profilePhotoUrl={profilePhotoUrl} />
			<Segment>
				<StyledForm onSubmit={handleEditProfile}>
					<FormField
						name="username"
						label="Username"
						value={username}
						onChange={handleInput}
						placeholder="Username"
						error={formErrors.username}
					/>

					<FormField
						name="trailName"
						value={trailName}
						placeholder="Trail Name"
						onChange={handleInput}
						label="Trail Name"
						error={formErrors.trailName}
					/>

					<FormField
						name="userLocation"
						value={userLocation}
						placeholder="Durango, Colorado"
						onChange={handleInput}
						label="Based In"
						error={formErrors.userLocation}
					/>

					<FormTextArea
						name="userBio"
						value={userBio}
						placeholder="Bio for your profile"
						onChange={handleInput}
						maxLength={maxLength}
						error={formErrors.userBio}
					/>

					{serverError.error && (
						<Message messageType="error" text={serverError.message} />
					)}

					{isSuccess && <Message messageType="success" text="Profile updated!" />}

					<Flex justify="end">
						<Button mt="4" type="submit" disabled={!isProfileChanged}>
							<SaveIcon />
							Save Profile
						</Button>
					</Flex>
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
