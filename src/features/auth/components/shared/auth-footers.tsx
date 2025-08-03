import { Link as RouterLink } from 'react-router-dom';
import { Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { LandingLink } from '@/components/ui';

export const LoginFooter = () => (
	<Flex className="mt-4 justify-center">
		<Text size="3">
			<RouterLink to={'/register'}>Sign Up</RouterLink> |{' '}
			<RouterLink to={'/reset-password'}>Forgot Your Password</RouterLink>
		</Text>
	</Flex>
);

export const RegisterFooter = () => (
	<Stack className="mt-4">
		<Text color="gray" size="1" my="4">
			By clicking "Create account" or "Continue with Google", you agree to the
			Tidytrek <LandingLink to="terms-of-service">Terms of Service</LandingLink>{' '}
			and <LandingLink to="privacy-policy">Privacy Policy</LandingLink>.
		</Text>

		<Text size="3" color="gray">
			Already have an account? <RouterLink to={'/'}>Log In</RouterLink>
		</Text>
	</Stack>
);