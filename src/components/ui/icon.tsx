import { Flex } from '@radix-ui/themes';

type IconProps = {
	children: React.ReactNode;
};

export const Icon = ({ children }: IconProps) => {
	return (
		<Flex asChild align="center" mr="2">
			<span>{children}</span>
		</Flex>
	);
};
