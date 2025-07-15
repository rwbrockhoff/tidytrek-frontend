import { Text } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { CloseIcon } from '@/components/icons';
import { useParams, useNavigate } from 'react-router-dom';

export const GuestPreviewBanner = () => {
	const { packId } = useParams();
	const navigate = useNavigate();

	const handleExitPreview = () => {
		navigate(`/pack/${packId}`);
	};

	return (
		<Flex className="items-center gap-4">
			<Button
				size="sm"
				variant="outline"
				iconLeft={<CloseIcon />}
				onClick={handleExitPreview}>
				Exit Preview
			</Button>
			<Text size="1" color="gray">
				You are currently in preview mode.
			</Text>
		</Flex>
	);
};
