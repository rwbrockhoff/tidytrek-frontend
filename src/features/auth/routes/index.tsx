import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthFallback } from '../components/auth-fallback';
import { lazyImport } from '@/utils';
const { Login } = lazyImport(() => import('./login'), 'Login');
const { Register } = lazyImport(() => import('./register'), 'Register');
const { ResetPassword } = lazyImport(() => import('./reset-password'), 'ResetPassword');
const { ResetSuccess } = lazyImport(() => import('./reset-success'), 'ResetSuccess');
const { Welcome } = lazyImport(() => import('./welcome'), 'Welcome');

export const AuthRoutes = () => {
	return (
		<div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: 'var(--full-height)' }}>
			<Suspense fallback={<AuthFallback />}>
				<Routes>
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="reset-password/*" element={<ResetPassword />} />
					<Route path="reset-password/success" element={<ResetSuccess />} />
					<Route path="welcome/*" element={<Welcome />} />
					<Route path="*" index element={<Login />} />
				</Routes>
			</Suspense>
		</div>
	);
};

