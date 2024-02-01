import { useMemo } from 'react';
export type MutationPending = { isPending: boolean };

export const useCombinePendingStatus = (mutations: MutationPending[]): boolean => {
	return useMemo(() => {
		for (const mutation of mutations) {
			if (mutation.isPending) return true;
		}
		return false;
	}, [mutations]);
};
