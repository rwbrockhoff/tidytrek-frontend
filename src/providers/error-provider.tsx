import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';
import { AppErrorFallback } from '@/components';

type ErrorProviderProps = {
	children: React.ReactNode;
};

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
	return (
		<Sentry.ErrorBoundary>
			<ErrorBoundary FallbackComponent={AppErrorFallback}>
				{children}
			</ErrorBoundary>
		</Sentry.ErrorBoundary>
	);
};