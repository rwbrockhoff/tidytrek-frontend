import { createClient } from '@supabase/supabase-js';

const publicKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGFldWtyeHhyeWNldmh2cHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTUxMzAsImV4cCI6MjA2NTMzMTEzMH0.KcBzod69M4XVhloHaNQCfpWv0o2DUHPLPGuN3-9Qu88';

// No-op storage to disable localStorage completely
const noOpStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};

const supabase = createClient('https://bstaeukrxxrycevhvpqx.supabase.co', publicKey, {
	auth: {
		storage: noOpStorage,
		autoRefreshToken: false, // We handle refresh via backend
		persistSession: false,   // No client-side session persistence
	}
});

export default supabase;

export const reauthenticateUser = async () => {
	return await supabase.auth.reauthenticate();
};

export const updatePassword = async (password: string, nonce: string) => {
	return await supabase.auth.updateUser({ password, nonce });
};
