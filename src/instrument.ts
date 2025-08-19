import * as Sentry from '@sentry/react';

const dsn =
	'https://57bba9b3558788672699ae6884ebe7c8@o4509617553932288.ingest.us.sentry.io/4509725083369472';
const environment = import.meta.env.MODE || 'development';

if (dsn && environment === 'production') {
	Sentry.init({
		dsn,
		environment,
		tracesSampleRate: 0.1,
		replaysSessionSampleRate: 0,
		replaysOnErrorSampleRate: 0.05,
		integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
	});
}
