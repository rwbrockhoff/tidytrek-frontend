import { useMemo } from 'react';
export type MutationSuccess = { isSuccess: boolean };

export const useCombineSuccess = (mutations: MutationSuccess[]): boolean => {
	return useMemo(() => {
		for (const mutation of mutations) {
			if (mutation.isSuccess) return true;
		}
		return false;
	}, [mutations]);
};
