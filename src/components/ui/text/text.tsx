import { Text as RadixText, Flex } from '@radix-ui/themes';
import styles from './text.module.css';

type TextProps = {
	children: React.ReactNode;
	icon?: React.ReactNode;
};

export const Text = (props: TextProps) => {
	const { children, icon } = props;
	return (
		<RadixText mr="4">
			<Flex align="center">
				<div className={styles.iconContainer}>{icon}</div>
				{children}
			</Flex>
		</RadixText>
	);
};
