import { useRouteError } from 'react-router-dom';
import { Flex, Text, Heading, Button } from '@radix-ui/themes';
import styled from 'styled-components';
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
		<ErrorContainer align="center" justify="center" direction="column">
			<BiSolidTree size={100} />
			<Heading as="h1" size="8" align="center">
				Oops! There was an error.
			</Heading>
			<Text align="center" size="3">
				Your error has been sent to our engineers who might be trail running or fly
				fishing right now. But rest assured, they'll fix this up as soon as they can.
			</Text>
			{hasResetFunction && (
				<StyledButton size="2" color="jade" onClick={() => props.resetErrorBoundary()}>
					Retry Request
				</StyledButton>
			)}
			<Text align="center">
				If you're feeling social, you can reach out to our support team anyway:
				<a href="mailto: info@tidytrek.co"> info@tidytrek.co</a>
			</Text>
		</ErrorContainer>
	);
};

const ErrorContainer = styled(Flex)`
	height: 100%;
	max-width: 600px;
	padding: 2em;
	margin: 0 auto;
	h1 {
		font-size: 2em;
		font-weight: bold;
		margin: 1em 0em;
	}
	button {
		margin: 1em 0em;
	}
`;

const StyledButton = styled(Button)`
	padding: 0.5em 1em;
	border-radius: 0.25em;
	cursor: pointer;
`;
