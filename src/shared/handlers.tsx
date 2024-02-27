import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type InternalMutation<T> = UseMutationResult<
	AxiosResponse<any, any>,
	Error,
	T,
	unknown
>;
