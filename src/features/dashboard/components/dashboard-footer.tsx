import styles from './dashboard-footer.module.css';
import { Flex, Text } from '@radix-ui/themes';

type DashboardFooterProps = {
	affiliate: boolean;
	description: string;
};

export const DashboardFooter = ({ affiliate, description }: DashboardFooterProps) => {
	return (
		<footer className={styles.footer}>
			{affiliate && (
				<Flex align="end" justify="center">
					<Text align="center" weight="light" color="gray" size="2">
						{description ||
							`Using the affiliate links in this pack helps support the creator of this pack
						at no extra cost to you!`}
					</Text>
				</Flex>
			)}
		</footer>
	);
};
