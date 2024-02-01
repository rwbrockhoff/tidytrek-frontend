// import { type AxiosError } from 'axios';
// import { type UseMutationResult } from '@tanstack/react-query';

// import '@tanstack/react-query';

// declare module '@tanstack/react-query' {
// 	interface Register {
// 		defaultError: AxiosError;
// 	}
// }

// export type ReactQueryMutationResult<T> = UseMutationResult<
// 	AxiosResponse<any, any>,
// 	AxiosError<unknown, any>,
// 	T,
// 	unknown
// >;

export type ReactInput = React.ChangeEvent<HTMLInputElement>;

export type FormError = { error: boolean; message: string };
