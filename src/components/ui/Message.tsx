import { Callout } from '@radix-ui/themes';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineErrorOutline as ErrorIcon } from 'react-icons/md';

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
			mt="4"
			data-testid={`${id}-${messageType}`}
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
