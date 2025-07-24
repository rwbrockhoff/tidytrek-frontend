import * as Sentry from '@sentry/react';

const dsn =
	'https://57bba9b3558788672699ae6884ebe7c8@o4509617553932288.ingest.us.sentry.io/4509725083369472';
const environment = import.meta.env.MODE || 'development';

if (dsn) {
	Sentry.init({
		dsn,
		environment,
		tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
		// Current: minimal replay for free-tier
		replaysSessionSampleRate: 0,
		replaysOnErrorSampleRate: environment === 'production' ? 0.05 : 1.0,
		integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
	});
	console.log(`Sentry initialized for environment: ${environment}`);
} else {
	console.warn('Sentry DSN not configured. Skipping Sentry initialization.');
}
