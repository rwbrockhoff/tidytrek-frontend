import { type FormEvent } from 'react';
import { Form } from '@radix-ui/react-form';
import { Flex } from '@/components/layout';
import { Button, TextField, TextArea } from '@/components/alpine';
import { RefreshIcon, SaveIcon } from '@/components/icons';
import { Message } from '@/components/ui';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { useAxiosErrorMessage } from '@/hooks/form/use-axios-error';
import styles from '../profile-form/profile-form.module.css';

type FormInputs = {
	username: string;
	trailName: string;
	userBio: string;
	userLocation: string;
};

type ProfileFormFieldsProps = {
	userInfo: FormInputs;
	isProfileChanged: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: any;
	formErrors: ZodFormErrors<FormInputs>;
	onInput: (e: InputEvent | TextAreaEvent) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onGenerateUsername: () => void;
};

const maxLength = 250;

export const ProfileFormFields = ({
	userInfo,
	isProfileChanged,
	isSuccess,
	isError,
	error,
	formErrors,
	onInput,
	onSubmit,
	onGenerateUsername,
}: ProfileFormFieldsProps) => {
	const { userBio, userLocation, username, trailName } = userInfo;
	const serverErrorMessage = useAxiosErrorMessage(error);

	return (
		<Form className={styles.form} onSubmit={onSubmit}>
			<TextField.Input
				name="username"
				label="Username"
				value={username}
				onChange={onInput}
				placeholder="Username"
				error={formErrors.username}
				variant="icon"
				iconPosition="right"
				iconIsButton={true}
				icon={
					<Button
						size="sm"
						type="button"
						onClick={onGenerateUsername}
						aria-label="Generate random username"
						iconLeft={<RefreshIcon />}
					/>
				}
			/>

			<TextField.Input
				name="trailName"
				value={trailName}
				placeholder="Trail Name"
				onChange={onInput}
				label="Trail Name"
				error={formErrors.trailName}
			/>

			<TextField.Input
				name="userLocation"
				value={userLocation}
				placeholder="Denver, Colorado"
				onChange={onInput}
				label="Based In"
				error={formErrors.userLocation}
			/>

			<TextArea.Input
				name="userBio"
				value={userBio}
				label="Your Bio"
				placeholder="Bio for your profile"
				onChange={onInput}
				maxLength={maxLength}
				error={formErrors.userBio}
			/>

			{isError && <Message messageType="error" text={serverErrorMessage} />}

			{isSuccess && <Message messageType="success" text="Profile updated!" />}

			<Flex className="justify-start mt-2">
				<Button type="submit" disabled={!isProfileChanged} iconLeft={<SaveIcon />}>
					Save Profile
				</Button>
			</Flex>
		</Form>
	);
};
