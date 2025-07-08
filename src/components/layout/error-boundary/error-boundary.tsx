import { useRouteError } from 'react-router-dom';
import { Flex, Text, Heading, Button } from '@radix-ui/themes';
import styles from './error-boundary.module.css';
import { BiSolidTree } from 'react-icons/bi';

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
		<Flex align="center" justify="center" direction="column" className={styles.errorContainer}>
			<BiSolidTree size={100} />
			<Heading as="h1" size="8" align="center">
				Oops! There was an error.
			</Heading>
			<Text align="center" size="3">
				Your error has been sent to our engineers who might be trail running or fly
				fishing right now. But rest assured, they'll fix this up as soon as they can.
			</Text>
			{hasResetFunction && (
				<Button size="2" color="jade" className={styles.styledButton} onClick={() => props.resetErrorBoundary()}>
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

