import { Flex, Heading, Button } from '@radix-ui/themes';
import { Link } from '@/components/ui/Link';

export const ProfileBanner = () => {
	return (
		<Flex align="center" mb="4">
			<Link link="/">
				<Heading as="h2" ml="6">
					tidytrek
				</Heading>
			</Link>
			<Flex ml="auto" mr="6">
				<Link link={'/register'}>
					<Button>Sign Up</Button>
				</Link>
			</Flex>
		</Flex>
	);
};
