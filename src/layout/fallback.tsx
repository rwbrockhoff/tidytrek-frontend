import { Flex } from '@radix-ui/themes';
import { Spinner } from '@/components/ui';

export const Fallback = () => {
	return (
		<Flex align="center" justify="center" width="100%" height="100%">
			<Spinner size="3" active />
		</Flex>
	);
};

export const SidebarFallback = () => {
	return (
		<Flex align="center" justify="center" width="100%" mt="9">
			<Spinner active />
		</Flex>
	);
};
