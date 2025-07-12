import { type SocialLink, type ProfileInfo } from '@/types/profile-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { useState, useEffect, type FormEvent } from 'react';
import styles from './profile-form.module.css';
import { Flex } from '@radix-ui/themes';
import { Button, TextField, TextArea } from '@/components/alpine';
import { Form } from '@radix-ui/react-form';
import { RefreshIcon, SaveIcon } from '@/components/icons';
import { Message } from '@/components/ui';
import { Segment, SegmentGroup } from '@/components/primitives';
import { z, usernameSchema, basicInputSchema } from '@/schemas';
import { setFormInput } from '@/utils';
import { SocialLinks } from '../social-links';
import { useProfileActions } from '../../../hooks/use-profile-actions';
import { AvatarSettings } from '../avatar-settings';
import { clearZodErrors } from '@/hooks/form/use-zod-error';
import { useZodError } from '@/hooks/form/use-zod-error';
import { useAxiosErrorMessage } from '@/hooks/form/use-axios-error';
import { useQueryClient } from '@tanstack/react-query';
import { profileSettingsKeys } from '@/queries/query-keys';
import { tidyTrekAPI } from '@/api/tidytrekAPI';

type ProfileFormProps = {
	profileInfo: ProfileInfo | undefined;
	socialLinks: SocialLink[];
};

type FormInputs = {
	username: string;
	trailName: string;
	userBio: string;
	userLocation: string;
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

export const ProfileForm = ({ profileInfo, socialLinks }: ProfileFormProps) => {
	const queryClient = useQueryClient();

	const [isProfileChanged, setIsProfileChanged] = useState(false);
	const [userInfo, setUserInfo] = useState<FormInputs>({
		userBio: '',
		userLocation: '',
		username: '',
		trailName: '',
	});

	const {
		mutations: {
			editProfile: {
				mutate: editProfile,
				isSuccess,
				isError,
				error,
				reset: resetEditProfileState,
			},
		},
	} = useProfileActions();

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<FormInputs>([
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
		clearZodErrors<FormInputs>(e, formErrors, resetFormErrors);
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
		<Flex direction="column">
			<SegmentGroup direction="column">
				<AvatarSettings profilePhotoUrl={profilePhotoUrl} />
				<Segment>
					<Form className={styles.form} onSubmit={handleEditProfile}>
						<TextField.Input
							name="username"
							label="Username"
							value={username}
							onChange={handleInput}
							placeholder="Username"
							error={formErrors.username}
							variant="icon"
							iconPosition="right"
							iconIsButton={true}
							icon={
								<Button
									size="sm"
									type="button"
									onClick={handleGenerateUsername}
									aria-label="Generate random username"
									iconLeft={<RefreshIcon />}
								/>
							}
						/>

						<TextField.Input
							name="trailName"
							value={trailName}
							placeholder="Trail Name"
							onChange={handleInput}
							label="Trail Name"
							error={formErrors.trailName}
						/>

						<TextField.Input
							name="userLocation"
							value={userLocation}
							placeholder="Denver, Colorado"
							onChange={handleInput}
							label="Based In"
							error={formErrors.userLocation}
						/>

						<TextArea.Input
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

						<Flex justify="start" mt="2">
							<Button type="submit" disabled={!isProfileChanged} iconLeft={<SaveIcon />}>
								Save Profile
							</Button>
						</Flex>
					</Form>
				</Segment>
				<Segment>
					<SocialLinks socialLinks={socialLinks} />
				</Segment>
			</SegmentGroup>
		</Flex>
	);
};
