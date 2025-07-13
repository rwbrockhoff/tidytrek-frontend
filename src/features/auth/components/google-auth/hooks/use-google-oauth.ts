import { useRef, useEffect } from 'react';
import { type GoogleCredentialResponse, GOOGLE_PUBLIC_ID } from '../google-types';

type UseGoogleOAuthProps = {
	onGoogleAuth: (response: GoogleCredentialResponse) => void;
};

export const useGoogleOAuth = ({ onGoogleAuth }: UseGoogleOAuthProps) => {
	const google_button = useRef(null);

	useEffect(() => {
		if (process.env.NODE_ENV === 'test') return;
		// subscribe to google gsi and render button
		if (google_button.current && google) {
			google.accounts.id.initialize({
				client_id: GOOGLE_PUBLIC_ID,
				callback: onGoogleAuth,
			});
			google.accounts.id.renderButton(google_button.current, {
				text: 'continue_with',
				logo_alignment: 'center',
				size: 'large',
			});
		}
	}, [google_button.current, onGoogleAuth]);

	return {
		google_button,
	};
};

