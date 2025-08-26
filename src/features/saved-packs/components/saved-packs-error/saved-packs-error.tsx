import { Button } from '@/components/alpine';
import { ErrorIcon, RefreshIcon } from '@/components/icons';
import { Flex, Stack } from '@/components/layout';
import { Text, Heading } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import styles from './saved-packs-error.module.css';

type SavedPacksErrorProps = {
	onRetry?: () => void;
};

export const SavedPacksError = ({ onRetry }: SavedPacksErrorProps) => {
	return (
		<div className={styles.errorContainer}>
			<Stack className="gap-4 items-center text-center">
				<Flex className={cn('items-center gap-2', styles.errorTitle)}>
					<ErrorIcon />
					<Heading size="4">Unable to load saved packs</Heading>
				</Flex>

				<Text className={styles.errorMessage}>
					There was an error fetching your saved packs.
				</Text>

				{onRetry && (
					<Button
						onClick={onRetry}
						variant="outline"
						color="secondary"
						size="sm"
						iconLeft={<RefreshIcon />}>
						Try Again
					</Button>
				)}
			</Stack>
		</div>
	);
};
