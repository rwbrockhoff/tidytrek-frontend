import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrek-api';
import { extractData } from './extract-data';
import { userKeys } from './query-keys';
import type {
	CreateSubscriptionRequest,
	CancelSubscriptionRequest,
	UpdatePaymentMethodRequest,
	SubscriptionResponse,
	CreateSubscriptionResponse,
} from '@/types/subscription-types';

export const useGetSubscriptionQuery = () => {
	return useQuery<SubscriptionResponse>({
		queryKey: ['subscription'],
		queryFn: async () => {
			const response = await tidyTrekAPI
				.get('/subscription')
				.then(extractData<SubscriptionResponse>);
			return response;
		},
	});
};

export const useCreateSubscriptionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			data: CreateSubscriptionRequest,
		): Promise<CreateSubscriptionResponse> => {
			const response = await tidyTrekAPI.post('/subscription', data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subscription'] });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useUpdatePaymentMethodMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdatePaymentMethodRequest) => {
			const response = await tidyTrekAPI
				.put('/subscription/payment-method', data)
				.then(extractData);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subscription'] });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useCancelSubscriptionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CancelSubscriptionRequest) => {
			const response = await tidyTrekAPI
				.put('/subscription/cancel', data)
				.then(extractData);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subscription'] });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useReactivateSubscriptionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { subscriptionId: number }) => {
			const response = await tidyTrekAPI
				.put('/subscription/reactivate', { subscription_id: data.subscriptionId })
				.then(extractData);
			return response;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subscription'] });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};

export const useRestartSubscriptionMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			data: CreateSubscriptionRequest,
		): Promise<CreateSubscriptionResponse> => {
			const response = await tidyTrekAPI.post('/subscription/restart', data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subscription'] });
			queryClient.invalidateQueries({ queryKey: userKeys.all });
		},
	});
};
