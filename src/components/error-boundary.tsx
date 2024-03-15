import { useRouteError } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';
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
		<ErrorContainer>
			<Icon name="tree" size="huge" />
			<Header as="h1" textAlign="center">
				Oops! There was an error.
			</Header>
			<p>
				Your error has been sent to our engineers who might be trail running or fly
				fishing right now. But rest assured, they'll fix this up as soon as they can.
			</p>
			{hasResetFunction && (
				<Button primary onClick={() => props.resetErrorBoundary()}>
					<Icon name="redo" />
					Retry Request
				</Button>
			)}
			<p>
				If you're feeling social, you can reach out to our support team anyway:
				<a href="mailto: info@tidytrek.co"> info@tidytrek.co</a>
			</p>
		</ErrorContainer>
	);
};

const ErrorContainer = styled.div`
	height: 100%;
	max-width: 600px;
	padding: 2em;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	p {
		font-size: 1.1rem;
		text-align: center;
	}
	p:last-child {
		font-size: 1rem;
		font-style: italic;
	}
	&&& {
		h1 {
			margin-bottom: 0.5em;
		}
		button {
			margin: 2em 0em;
		}
	}
`;
