import { useMutation } from '@tanstack/react-query';
import { tidyTrekAPI } from '../api/tidytrek-api';
import { extractErrorMessage } from '../utils/error-utils';

export type CreateSubscriptionRequest = {
	priceId: string;
	paymentMethodId?: string;
};

export type CreateSubscriptionResponse = {
	subscriptionId: string;
	clientSecret?: string;
	status: 'succeeded' | 'requires_payment_method' | 'requires_action';
};

export const useCreateSubscriptionMutation = () => {
	return useMutation({
		mutationFn: async (data: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> => {
			const response = await tidyTrekAPI.post('/subscription', data);
			return response.data;
		},
		onError: (error) => {
			console.error('Subscription creation failed:', extractErrorMessage(error));
		},
	});
};