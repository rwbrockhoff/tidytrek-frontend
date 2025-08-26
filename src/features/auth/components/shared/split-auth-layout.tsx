import { type ReactNode, memo, useState } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { Stack } from '@/components/layout';
import styles from './split-auth-layout.module.css';
import { cn } from '@/styles/utils';
import authLandscapeLow from '@/assets/auth-landscape-bg-low.webp';
import authLandscapeHigh from '@/assets/auth-landscape-bg.webp';

type SplitAuthLayoutProps = {
	children: ReactNode;
};

// Persistent cache outside component to survive route changes
let highResImageLoaded = false;

export const SplitAuthLayout = memo(({ children }: SplitAuthLayoutProps) => {
	const [imageLoaded, setImageLoaded] = useState(highResImageLoaded);

	return (
		<div className={styles.splitContainer}>
			{/* Left side - photo & brand message */}
			<div className={styles.imageSection}>
				{/* Low-res placeholder  */}
				<img
					src={authLandscapeLow}
					alt=""
					className={cn(styles.imageBackground, styles.lowResBackground)}
					loading="eager"
				/>

				{/* High-res image  */}
				<img
					src={authLandscapeHigh}
					alt=""
					className={cn(
						styles.imageBackground,
						styles.highResBackground,
						imageLoaded && styles.imageLoaded,
					)}
					loading="eager"
					decoding="async"
					onLoad={() => {
						highResImageLoaded = true;
						setImageLoaded(true);
					}}
				/>
				<div className={styles.imageOverlay}>
					<Stack className="gap-4">
						<Heading size="8" className={styles.imageHeading}>
							Pack Smart, Hike Light
						</Heading>
						<Text size="4" className={cn(styles.imageText, 'opacity-90')}>
							Organize your gear & share with others
						</Text>
					</Stack>
				</div>
			</div>

			{/* Right side - auth form flows */}
			<div className={styles.formSection}>
				<div className={styles.formContent}>{children}</div>
			</div>
		</div>
	);
});
