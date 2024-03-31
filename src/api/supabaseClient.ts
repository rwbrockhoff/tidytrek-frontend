import { createClient } from '@supabase/supabase-js';

const publicKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZmNhdGp2Ynd4ZGthcGFwcnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1MTk1MTYsImV4cCI6MjAyNTA5NTUxNn0.SR5YxG8AUdmTL_d0DSdMmg7dUlBxfD9wAiG7V5csc9s';

const supabase = createClient('https://pnfcatjvbwxdkapaprsb.supabase.co', publicKey);

export default supabase;

export const reauthenticateUser = async () => {
	return await supabase.auth.reauthenticate();
};

export const updatePassword = async (password: string, nonce: string) => {
	return await supabase.auth.updateUser({ password, nonce });
};
