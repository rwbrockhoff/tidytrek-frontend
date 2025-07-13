import { useState } from 'react';
import { tidyTrekAPI } from '@/api/tidytrek-api';

type RedirectResponse = {
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

			// If trusted, return the redirect URL
			if (response.data.trusted) {
				return { redirectUrl: response.data.redirectUrl };
			}

			// If warning, return warning info
			if (response.data.warning) {
				return {
					warning: {
						message: response.data.message,
						domain: response.data.destination,
						continueUrl: response.data.continueUrl,
					},
				};
			}

			// Fallback
			return { redirectUrl: url };
		} catch (error) {
			// If API fails, treat as unsafe
			return {
				warning: {
					message: 'This link may not be safe. Proceed with caution.',
					domain: 'unknown',
					continueUrl: url,
				},
			};
		} finally {
			// regardless of success/fail, set loading to false
			setIsLoading(false);
		}
	};

	return { checkRedirect, isLoading };
};
