import { Text } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { CloseIcon, ViewsIcon } from '@/components/icons';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './guest-preview-banner.module.css';
import { cn } from '@/styles/utils';

export const GuestPreviewBanner = () => {
	const { packId } = useParams();
	const navigate = useNavigate();

	const handleExitPreview = () => {
		navigate(`/pack/${packId}`);
	};

	return (
		<div className={cn(styles.banner, 'mb-12')}>
			<Flex className="items-center justify-between max-w-6xl mx-auto">
				<Flex className="items-center gap-2">
					<ViewsIcon />
					<Text size="2" className={styles.message}>
						Preview mode - this is how others see your pack
					</Text>
				</Flex>
				<Button
					size="sm"
					color="primary"
					iconLeft={<CloseIcon />}
					onClick={handleExitPreview}>
					Exit Preview
				</Button>
			</Flex>
		</div>
	);
};
