import { Flex, Heading, Button } from '@radix-ui/themes';
import { Link, LandingLink } from '@/components/ui/Link';

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
