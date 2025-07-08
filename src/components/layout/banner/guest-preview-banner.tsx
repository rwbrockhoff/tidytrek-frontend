import { Button, Flex, Text } from '@radix-ui/themes';
import { Link, CloseIcon } from '../../ui';
import { useParams } from 'react-router-dom';

export const GuestPreviewBanner = () => {
	const { packId } = useParams();

	return (
		<Flex align="center" gap="4">
			<Link to={`/pack/${packId}`}>
				<Button size="1" variant="outline" radius="large">
					<CloseIcon />
					Exit Preview
				</Button>
			</Link>
			<Text size="1" color="gray">
				You are currently in preview mode.
			</Text>
		</Flex>
	);
};
