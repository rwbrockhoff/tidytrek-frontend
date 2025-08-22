import { Segment } from '@/components/primitives';
import { Heading, Text } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { Stack } from '@/components/layout';
import {
	AuthContainer,
	FormContainer,
} from '../components/form-components/form-components';
import { Logo } from '@/layout/logo';
import { useNavigate, Link } from 'react-router-dom';
import { SplitAuthLayout } from '../components/shared/split-auth-layout';
import { useAuthActions } from '../hooks/use-auth-actions';
import supabase from '@/api/supabase-client';
import { ForwardArrowIcon } from '@/components/icons';

export const ResetSuccess = () => {
	const navigate = useNavigate();
	const { loginWithoutNavigation } = useAuthActions();

	const handleGoToDashboard = async () => {
		// Check for session and log user in
		const { data: { session } } = await supabase.auth.getSession();
		const user = session?.user;
		const { id, email } = user || {};
		if (id && email) {
			await loginWithoutNavigation({
				email,
				userId: id,
				supabaseRefreshToken: session?.refresh_token,
			});
		}
		navigate('/', { viewTransition: true });
	};

	return (
		<SplitAuthLayout>
			<AuthContainer>
				<FormContainer>
					<Heading as="h1">
						<Link to="/" viewTransition><Logo className="mx-auto mb-4" /></Link>
					</Heading>

					<Segment radius="2">
						<Stack className="gap-4">
							<Heading as="h2" size="6" color="jade">
								Success!
							</Heading>
							<Text>
								Your password has been successfully updated. Click the button below to log in.
							</Text>
							<Button style={{ width: '100%' }} onClick={handleGoToDashboard} iconRight={<ForwardArrowIcon />}>
								Go To Dashboard
							</Button>
						</Stack>
					</Segment>
				</FormContainer>
			</AuthContainer>
		</SplitAuthLayout>
	);
};
