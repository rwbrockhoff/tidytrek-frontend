import { Flex, Text } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { Link, CloseIcon } from '../../ui';
import { useParams } from 'react-router-dom';

export const GuestPreviewBanner = () => {
	const { packId } = useParams();

	return (
		<Flex align="center" gap="4">
			<Link to={`/pack/${packId}`}>
				<Button size="sm" variant="outline" iconLeft={<CloseIcon size={16} />}>
					Exit Preview
				</Button>
			</Link>
			<Text size="1" color="gray">
				You are currently in preview mode.
			</Text>
		</Flex>
	);
};
