export type GoogleAccounts = {
	id: {
		initialize: (config: {
			client_id: string;
			callback: (response: GoogleCredentialResponse) => void;
		}) => void;
		renderButton: (element: HTMLElement, options: GoogleButtonConfig) => void;
	};
};

export type GoogleCredentialResponse = {
	credential?: string;
	error?: string;
};

export type GoogleButtonConfig = {
	text?: 'continue_with' | 'signin_with' | 'signup_with';
	logo_alignment?: 'left' | 'center';
	size?: 'large' | 'medium' | 'small';
};

declare global {
	const google: { accounts: GoogleAccounts };
}

export type AuthMethod = 'signup' | 'signin';

export const GOOGLE_PUBLIC_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;