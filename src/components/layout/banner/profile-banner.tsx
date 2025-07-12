import { Flex, Heading } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { Link, LandingLink } from '@/components/ui';

export const ProfileBanner = () => {
	return (
		<Flex align="center" mb="4">
			<LandingLink>
				<Heading as="h2" ml="6">
					tidytrek
				</Heading>
			</LandingLink>
			<Flex ml="auto" mr="6">
				<Link to={'/register'}>
					<Button>Sign Up</Button>
				</Link>
			</Flex>
		</Flex>
	);
};
