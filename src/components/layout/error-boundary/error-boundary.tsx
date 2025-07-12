import { useRouteError } from 'react-router-dom';
import { Flex, Text, Heading } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import styles from './error-boundary.module.css';
import { RefreshIcon, TreeIcon } from '@/components/icons';

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
		<Flex
			align="center"
			justify="center"
			direction="column"
			className={styles.errorContainer}>
			<Heading as="h1" size="6" align="center">
				<Flex align="center" gap="6" direction="column">
					<TreeIcon fontSize={'2em'} />
					Oops! There was an error.
				</Flex>
			</Heading>
			<Text align="center" size="3">
				Your error has been sent to our engineers who might be trail running or fly
				fishing right now. But rest assured, they'll fix this up as soon as they can.
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
				If you're feeling social, you can reach out to our support team anyway:
				<a href="mailto: info@tidytrek.co"> info@tidytrek.co</a>
			</Text>
		</Flex>
	);
};
