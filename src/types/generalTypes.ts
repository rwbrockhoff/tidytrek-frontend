export type ReactInput = React.ChangeEvent<HTMLInputElement>;

export type FormError = { error: boolean; message: string };

export type PasswordInfo = {
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};
