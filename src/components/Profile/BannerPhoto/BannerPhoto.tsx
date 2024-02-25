import styled from 'styled-components';
import UploadFile from '../../../shared/ui/UploadFile';
import { useState } from 'react';
import Dimmer from '../../../shared/ui/Dimmer';
import { Loader } from 'semantic-ui-react';

type BannerPhotoProps = {
	bannerPhotoUrl: string | undefined;
	isPending: boolean;
	uploadEnabled: boolean;
	onUpload: (formData: FormData) => void;
};

const BannerPhoto = (props: BannerPhotoProps) => {
	const { bannerPhotoUrl, isPending, uploadEnabled = false, onUpload } = props;
	const [showUploadMode, setShowUploadMode] = useState(false);

	const dimmerEnabled = uploadEnabled && (isPending || showUploadMode);
	return (
		<BannerContainer
			onMouseOver={() => setShowUploadMode(true)}
			onMouseLeave={() => setShowUploadMode(false)}>
			<BannerImage src={bannerPhotoUrl} />

			{isPending && <StyledLoader active inverted size="big" />}

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

export default BannerPhoto;

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
	bottom: 0px;
	right: 25px;
`;

const StyledDimmer = styled(Dimmer)`
	top: 0px;
	width: 100%;
	height: 250px;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;

const StyledLoader = styled(Loader)`
	&&& {
		left: 50%;
	}
`;
