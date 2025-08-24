import { useRouteError } from 'react-router-dom';
import { Text, Heading } from '@radix-ui/themes';
import { Stack } from '@/components/layout';
import { Button } from '@/components/alpine';
import styles from './error-boundary.module.css';
import { RefreshIcon, TreeIcon } from '@/components/icons';
import { cn } from '@/styles/utils';

// react router is opinionated on error handling
// this fn allows us to bubble errors outside of the router
// to be handled in our outer-most error boundary
export const BubbleError = () => {
	throw useRouteError();
};

type ErrorBoundaryProps = {
	error: object | string;
	resetErrorBoundary: () => void;
};

export const AppErrorFallback = (props: ErrorBoundaryProps) => {
	const hasResetFunction = props?.resetErrorBoundary !== undefined;
	return (
		<Stack className={cn(styles.errorContainer, 'items-center justify-center')}>
			<Heading as="h1" size="6" align="center">
				<Stack className="items-center gap-6">
					<TreeIcon fontSize={'2em'} />
					Oops! There was an error.
				</Stack>
			</Heading>
			<Text align="center" size="3" mb="4">
				Our team has been notified and we are working to fix it as soon as possible.
			</Text>
			{hasResetFunction && (
				<Button
					className={styles.styledButton}
					iconLeft={<RefreshIcon />}
					onClick={() => props.resetErrorBoundary()}>
					Retry Request
				</Button>
			)}
			<Text align="center">
				Need assistance? Contact our support:
				<a href="mailto: info@tidytrek.co"> info@tidytrek.co</a>
			</Text>
		</Stack>
	);
};
