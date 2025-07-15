import { Text as RadixText } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import styles from './text.module.css';

type TextProps = {
	children: React.ReactNode;
	icon?: React.ReactNode;
};

export const Text = (props: TextProps) => {
	const { children, icon } = props;
	return (
		<RadixText mr="4">
			<Flex className="items-center">
				<div className={styles.iconContainer}>{icon}</div>
				{children}
			</Flex>
		</RadixText>
	);
};
