import { useState } from 'react';
import { tidyTrekAPI } from '@/api/tidytrek-api';
import { extractData } from '@/queries/extract-data';

type RedirectAPIResponse = {
	trusted?: boolean;
	redirectUrl?: string;
	warning?: boolean;
	message?: string;
	destination?: string;
	continueUrl?: string;
};

export type RedirectResponse = {
	redirectUrl?: string;
	warning?: {
		message: string;
		domain: string;
		continueUrl: string;
	};
};

export const useRedirects = () => {
	const [isLoading, setIsLoading] = useState(false);

	const checkRedirect = async (url: string): Promise<RedirectResponse> => {
		setIsLoading(true);
		try {
			const response = await tidyTrekAPI.post('/redirect', { url });
			const responseData = extractData<RedirectAPIResponse>(response);

			if (responseData.trusted) {
				return { redirectUrl: responseData.redirectUrl };
			}

			if (responseData.warning) {
				return {
					warning: {
						message: responseData.message || 'This link may not be safe.',
						domain: responseData.destination || 'unknown',
						continueUrl: responseData.continueUrl || url,
					},
				};
			}

			return { redirectUrl: url };
		} catch (error) {
			return {
				warning: {
					message: 'This link may not be safe. Proceed with caution.',
					domain: 'unknown',
					continueUrl: url,
				},
			};
		} finally {
			setIsLoading(false);
		}
	};

	return { checkRedirect, isLoading };
};
