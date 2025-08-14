import { PrivateIcon } from '@/components/icons';
import { Stack } from '@/components/layout';
import { Text } from '@radix-ui/themes';
import { ProfileBanner } from '@/features/auth/components/profile-banner';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';
import { Button } from '@/components/alpine';
import { useNavigate } from 'react-router-dom';
import { TreeIcon2 } from '@/components/icons';

export const PackNotAvailable = () => {
	const navigate = useNavigate();

	const handleBackHome = () => {
		navigate('/');
	};

	return (
		<PageLayout>
			<ProfileBanner />

			<Stack className="items-center justify-center min-h-96 text-center gap-6">
				<Text size="8" className="flex gap-4">
					<PrivateIcon /> Pack Not Available
				</Text>
				<p className="max-w-md">
					This pack is private or no longer exists. The owner may have changed their
					sharing settings.
				</p>
				<Button variant="outline" iconLeft={<TreeIcon2 />} onClick={handleBackHome}>
					Back Home
				</Button>
			</Stack>
		</PageLayout>
	);
};
