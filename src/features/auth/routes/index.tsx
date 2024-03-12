import { Route, Routes } from 'react-router-dom';
import { Authentication } from './authentication';
import { ResetPassword } from './reset-password';
import { ResetSuccess } from './reset-success';
import { Welcome } from './welcome';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="register" element={<Authentication isRegisterForm={true} />} />
			<Route path="login" element={<Authentication isRegisterForm={false} />} />
			<Route path="reset-password/*" element={<ResetPassword />} />
			<Route path="reset-password/success" element={<ResetSuccess />} />
			<Route path="welcome/*" element={<Welcome />} />
			<Route path="*" index element={<Authentication isRegisterForm={false} />} />
		</Routes>
	);
};

// routes available as public + protected
export * from './welcome';
export * from './reset-success';
