import { Message as SemanticMessage, Icon } from 'semantic-ui-react';
import { type FormError } from '../../types/formTypes';

type MessageProps = {
	loading?: boolean;
	error: FormError;
	success: boolean;
	successMessage: string;
};

const Message = ({ error, success, successMessage }: MessageProps) => {
	const iconName = success ? 'thumbs up outline' : 'hand point right outline';

	if (success) {
		return (
			<SemanticMessage success={success}>
				<Icon name={iconName} />
				{successMessage}
			</SemanticMessage>
		);
	} else if (error.error) {
		return (
			<SemanticMessage warning={error.error}>
				<Icon name={iconName} />
				{error.message || 'Oops! There was an error.'}
			</SemanticMessage>
		);
	} else return null;
};

export default Message;
