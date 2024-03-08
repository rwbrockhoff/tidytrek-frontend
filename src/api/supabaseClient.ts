import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_CLIENT,
	import.meta.env.VITE_SUPABASE_KEY,
);

export default supabase;

export const reauthenticateUser = async () => {
	return await supabase.auth.reauthenticate();
};

export const updatePassword = async (password: string, nonce: string) => {
	return await supabase.auth.updateUser({ password, nonce });
};
