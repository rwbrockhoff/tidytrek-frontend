import { Flex, Heading } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { LandingLink } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const ProfileBanner = () => {
	const navigate = useNavigate();

	return (
		<Flex align="center" mb="4">
			<LandingLink>
				<Heading as="h2" ml="6">
					tidytrek
				</Heading>
			</LandingLink>
			<Flex ml="auto" mr="6">
				<Button onClick={() => navigate('/register')}>Sign Up</Button>
			</Flex>
		</Flex>
	);
};
