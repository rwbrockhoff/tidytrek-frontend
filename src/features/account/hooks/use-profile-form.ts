import { useState, useEffect, type FormEvent } from 'react';
import { type ProfileInfo } from '@/types/profile-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import {
	useEditProfileMutation,
	useGenerateUsernameQuery,
} from '@/queries/profile-settings-queries';
import { clearZodErrors, useZodError } from '@/hooks/form/use-zod-error';
import { setFormInput } from '@/utils';
import { z, usernameSchema, basicInputSchema } from '@/schemas';

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

type UseProfileFormProps = {
	profileInfo: ProfileInfo | undefined;
};

export const useProfileForm = ({ profileInfo }: UseProfileFormProps) => {
	const [isProfileChanged, setIsProfileChanged] = useState(false);
	const [userInfo, setUserInfo] = useState<FormInputs>({
		userBio: '',
		userLocation: '',
		username: '',
		trailName: '',
	});

	const {
		mutate: editProfile,
		isSuccess,
		isError,
		error,
		reset: resetEditProfileState,
	} = useEditProfileMutation();

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<FormInputs>([
		'username',
		'userBio',
		'trailName',
		'userLocation',
	]);

	const { refetch: generateUsername } = useGenerateUsernameQuery();

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
		const result = await generateUsername();
		if (result.data?.username) {
			setUserInfo((prev) => ({ ...prev, username: result.data.username }));
			setIsProfileChanged(true);
		}
	};

	return {
		userInfo,
		isProfileChanged,
		isSuccess,
		isError,
		error,
		formErrors,
		handleInput,
		handleEditProfile,
		handleGenerateUsername,
	};
};
