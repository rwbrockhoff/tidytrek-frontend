import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';
import { AppErrorFallback } from '@/components';

type ErrorProviderProps = {
	children: React.ReactNode;
};

const handleError = (error: Error) => {
	Sentry.captureException(error);
};

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
	return (
		<ErrorBoundary
			FallbackComponent={AppErrorFallback}
			onError={handleError}
		>
			{children}
		</ErrorBoundary>
	);
};