import { Callout } from '@radix-ui/themes';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md';
import { WarningIcon } from '.';
import { CalloutRootProps } from 'node_modules/@radix-ui/themes/dist/esm/components/callout';

type MessageProps = {
	messageType: 'success' | 'error';
	text: string;
	id?: string;
};

export const Message = (props: MessageProps) => {
	const { messageType, text, id } = props;
	const isSuccess = messageType === 'success';
	const iconSize = 15;
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
				{isSuccess ? <FaCheck size={iconSize} /> : <ErrorIcon size={iconSize} />}
			</Callout.Icon>
			<Callout.Text>{text}</Callout.Text>
		</Callout.Root>
	);
};

type WarningMessageProps = {
	message: string;
	width?: string;
} & CalloutRootProps;

export const WarningMessage = (props: WarningMessageProps) => {
	const { message, width = '100%' } = props;
	return (
		<Callout.Root color="amber" variant="outline" {...props} style={{ width }}>
			<Callout.Icon>
				<WarningIcon />
			</Callout.Icon>
			<Callout.Text> {message}</Callout.Text>
		</Callout.Root>
	);
};
