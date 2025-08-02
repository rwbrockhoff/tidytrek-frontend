import { Heading } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { LandingLink } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const ProfileBanner = () => {
	const navigate = useNavigate();

	return (
		<Flex className="items-center mb-12">
			<LandingLink>
				<Heading as="h2" ml="6">
					tidytrek
				</Heading>
			</LandingLink>
			<Flex className="ml-auto mr-6">
				<Button onClick={() => navigate('/register')}>Sign Up</Button>
			</Flex>
		</Flex>
	);
};
