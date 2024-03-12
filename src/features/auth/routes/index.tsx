import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { Fallback } from '@/layout/fallback';
import { lazyImport } from '@/utils';
const { Authentication } = lazyImport(() => import('./authentication'), 'Authentication');
const { ResetPassword } = lazyImport(() => import('./reset-password'), 'ResetPassword');
const { ResetSuccess } = lazyImport(() => import('./reset-success'), 'ResetSuccess');
const { Welcome } = lazyImport(() => import('./welcome'), 'Welcome');

export const AuthRoutes = () => {
	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route path="register" element={<Authentication isRegisterForm={true} />} />
				<Route path="login" element={<Authentication isRegisterForm={false} />} />
				<Route path="reset-password/*" element={<ResetPassword />} />
				<Route path="reset-password/success" element={<ResetSuccess />} />
				<Route path="welcome/*" element={<Welcome />} />
				<Route path="*" index element={<Authentication isRegisterForm={false} />} />
			</Routes>
		</Suspense>
	);
};

// routes available as public + protected
export * from './welcome';
export * from './reset-success';
