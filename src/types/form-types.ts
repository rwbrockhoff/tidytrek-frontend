import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { SyntheticEvent } from 'react';

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type CheckboxEvent = React.FormEvent<HTMLInputElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type FormEvent = SyntheticEvent<HTMLFormElement, SubmitEvent>;

export type FormError = { error: boolean; message: string };

export type PasswordInfo = {
	password: string;
	confirmPassword: string;
	emailCode: string;
};

// Generic mutation type with optional response data type

// Usage: InternalMutation<RequestType, ResponseType> for API responses
// Example: editProfile: InternalMutation<UserInfo>;
export type InternalMutation<T, TData = unknown> = UseMutationResult<
	AxiosResponse<TData>,
	Error,
	T,
	unknown
>;
