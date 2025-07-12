import { Flex, Text } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { Link } from '@/components/ui';
import { CloseIcon } from '@/components/icons';
import { useParams } from 'react-router-dom';

export const GuestPreviewBanner = () => {
	const { packId } = useParams();

	return (
		<Flex align="center" gap="4">
			<Link to={`/pack/${packId}`}>
				<Button size="sm" variant="outline" iconLeft={<CloseIcon />}>
					Exit Preview
				</Button>
			</Link>
			<Text size="1" color="gray">
				You are currently in preview mode.
			</Text>
		</Flex>
	);
};
