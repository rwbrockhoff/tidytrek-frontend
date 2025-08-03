import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './query-keys';
import { tidyTrekAPI } from '../api/tidytrek-api';
import { type Settings } from '../types/settings-types';
import { type SimpleMutation } from './mutation-types';
import { extractData } from './extract-data';

export const useUpdateSettingsMutation = (): SimpleMutation<
	Partial<Settings>,
	{ message?: string }
> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (settings: Partial<Settings>) =>
			tidyTrekAPI.put('/user-settings', settings).then(extractData<{ message?: string }>),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};
