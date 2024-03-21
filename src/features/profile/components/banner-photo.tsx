import styled from 'styled-components';
import { useState } from 'react';
import { UploadFile } from '@/components';
import { Dimmer, Spinner } from '@/components/ui';

type BannerPhotoProps = {
	bannerPhotoUrl: string | undefined;
	isPending: boolean;
	uploadEnabled: boolean;
	onUpload: (formData: FormData) => void;
};

export const BannerPhoto = (props: BannerPhotoProps) => {
	const { bannerPhotoUrl, isPending, uploadEnabled = false, onUpload } = props;
	const [showUploadMode, setShowUploadMode] = useState(false);

	const dimmerEnabled = uploadEnabled && (isPending || showUploadMode);
	return (
		<BannerContainer
			onMouseOver={() => setShowUploadMode(true)}
			onMouseLeave={() => setShowUploadMode(false)}>
			<BannerImage src={bannerPhotoUrl} alt="landscape profile banner photo" />

			<Spinner active={isPending} size="4" absoluteCenter />

			<StyledDimmer active={dimmerEnabled} />

			{showUploadMode && uploadEnabled && (
				<UploadContainer>
					<UploadFile
						fileId="profile-banner-photo"
						fileName="bannerPhoto"
						isPending={isPending}
						onUpload={onUpload}
					/>
				</UploadContainer>
			)}
		</BannerContainer>
	);
};

const BannerContainer = styled.div`
	position: relative;
	width: 100%;
	height: 250px;
`;
const BannerImage = styled.img`
	width: 100%;
	height: 250px;
	object-fit: cover;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
	margin-bottom: -5px;
`;

const UploadContainer = styled.div`
	position: absolute;
	bottom: 15px;
	right: 25px;
`;

const StyledDimmer = styled(Dimmer)`
	top: 0px;
	width: 100%;
	height: 250px;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;
