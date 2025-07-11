import { Callout } from '@radix-ui/themes';
import type { ComponentProps } from 'react';
import { CheckIcon, ErrorIcon, WarningIcon } from '../';

type MessageProps = {
	messageType: 'success' | 'error';
	text: string;
	id?: string;
};

export const Message = (props: MessageProps) => {
	const { messageType, text, id } = props;
	const isSuccess = messageType === 'success';
	const iconSize = 16;
	const messageColor = isSuccess ? 'grass' : 'tomato';

	return (
		<Callout.Root
			size={'2'}
			color={messageColor}
			variant="surface"
			my="4"
			data-testid={`${id}-${messageType}`}
			aria-label="error warning"
			role="alert"
			aria-invalid={isSuccess ? 'false' : 'true'}
			aria-errormessage={isSuccess ? '' : text}>
			<Callout.Icon>
				{isSuccess ? <CheckIcon size={iconSize} /> : <ErrorIcon size={iconSize} />}
			</Callout.Icon>
			<Callout.Text>{text}</Callout.Text>
		</Callout.Root>
	);
};

type WarningMessageProps = {
	message: string;
	width?: string;
} & ComponentProps<typeof Callout.Root>;

export const WarningMessage = (props: WarningMessageProps) => {
	const { message, width = '100%', ...calloutProps } = props;
	return (
		<Callout.Root color="amber" variant="outline" {...calloutProps} style={{ width }}>
			<Callout.Icon>
				<WarningIcon size={16} />
			</Callout.Icon>
			<Callout.Text> {message}</Callout.Text>
		</Callout.Root>
	);
};
