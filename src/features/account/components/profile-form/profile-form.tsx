import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { useState, useEffect, type FormEvent } from 'react';
import styled from 'styled-components';
import { Button, Flex, IconButton } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import {
	Message,
	RefreshIcon,
	SaveIcon,
	Segment,
	SegmentGroup,
	Tooltip,
} from '@/components/ui';
import { z, usernameSchema, basicInputSchema } from '@/schemas';
import { setFormInput, usernameInfo, trailNameInfo } from '@/utils';
import { SocialLinks } from './social-links';
import { FormField, FormTextArea } from '@/components/ui';
import { useHandlers } from '../../hooks/use-profile-handlers';
import { useAxiosErrorMessage } from '@/hooks/use-axios-error';
import { AvatarSettings } from './avatar-settings';
import { useZodError } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { profileSettingsKeys } from '@/queries/query-keys';
import { tidyTrekAPI } from '@/api/tidytrekAPI';

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
	const queryClient = useQueryClient();

	const [isProfileChanged, setIsProfileChanged] = useState(false);
	const [userInfo, setUserInfo] = useState({
		userBio: '',
		userLocation: '',
		username: '',
		trailName: '',
	});

	const {
		editProfile: {
			mutate: editProfile,
			isSuccess,
			isError,
			error,
			reset: resetEditProfileState,
		},
	} = useHandlers().mutations;

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
	};

	const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = formSchema.safeParse(userInfo);
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return updateFormErrors(result);
		}
		editProfile(userInfo);
	};

	const handleGenerateUsername = async () => {
		const { username } = await generateUsername();
		setUserInfo((prev) => ({ ...prev, username }));
		setIsProfileChanged(true);
	};

	const generateUsername = async () => {
		return await queryClient.fetchQuery({
			queryKey: profileSettingsKeys.username,
			queryFn: () =>
				tidyTrekAPI.get('/profile-settings/random-username').then((res) => res.data),
		});
	};

	const { userBio, userLocation, username, trailName } = userInfo;
	const { profilePhotoUrl } = profileInfo || {};
	const serverErrorMessage = useAxiosErrorMessage(error);
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
						tooltip={<Tooltip content={usernameInfo} />}
						icon={
							<IconButton
								radius="medium"
								size="1"
								type="button"
								onClick={handleGenerateUsername}>
								<RefreshIcon />
							</IconButton>
						}
					/>

					<FormField
						name="trailName"
						value={trailName}
						placeholder="Trail Name"
						onChange={handleInput}
						label="Trail Name"
						error={formErrors.trailName}
						tooltip={<Tooltip content={trailNameInfo} />}
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
						label="Your Bio"
						placeholder="Bio for your profile"
						onChange={handleInput}
						maxLength={maxLength}
						error={formErrors.userBio}
					/>

					{isError && <Message messageType="error" text={serverErrorMessage} />}

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
