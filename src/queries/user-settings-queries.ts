import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrekAPI';
import { type Settings } from '../types/settings-types';
import { type SimpleMutation } from './mutation-types';
import { extractData } from '../utils';

export const useUpdateSettingsMutation = (): SimpleMutation<
	Partial<Settings>,
	{ message?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (settings: Partial<Settings>) =>
			tidyTrekAPI.put('/user-settings', settings).then(extractData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};
