import styles from './dashboard-footer.module.css';
import { Separator, Flex, Text } from '@radix-ui/themes';
import { HikingIcon, LandingLink } from '@/components/ui';

type DashboardFooterProps = {
	affiliate: boolean;
	description: string;
};

export const DashboardFooter = ({ affiliate, description }: DashboardFooterProps) => {
	return (
		<footer className={styles.footer}>
			{affiliate && (
				<Flex align="center" direction="column">
					<Text align="center" weight="light" color="gray" size="2">
						{description ||
							`Using the affiliate links in this pack helps support the creator of this pack
						at no extra cost to you!`}
					</Text>
					<Separator color="gray" size="3" mt="4" />
				</Flex>
			)}
			<LandingLink>
				<Flex justify="center" className={styles.logoTag}>
					<Text size="2">
						tidytrek
						<HikingIcon /> made in colorado
					</Text>
				</Flex>
			</LandingLink>
		</footer>
	);
};
