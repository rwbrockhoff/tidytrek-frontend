import { useRouteError } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { Flex, Text, Heading } from '@radix-ui/themes';
import styled from 'styled-components';

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
			<Icon name="tree" size="huge" />
			<Heading as="h1" size="8" align="center">
				Oops! There was an error.
			</Heading>
			<Text align="center" size="3">
				Your error has been sent to our engineers who might be trail running or fly
				fishing right now. But rest assured, they'll fix this up as soon as they can.
			</Text>
			{hasResetFunction && (
				<Button primary onClick={() => props.resetErrorBoundary()}>
					<Icon name="redo" />
					Retry Request
				</Button>
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

	&&& {
		h1 {
			margin-bottom: 0.5em;
		}
		button {
			margin: 2em 0em;
		}
	}
`;
