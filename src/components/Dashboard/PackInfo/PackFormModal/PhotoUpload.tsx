import { useState } from 'react';
import styled from 'styled-components';
import UploadFile from '../../../../shared/ui/UploadFile';
import { Loader } from 'semantic-ui-react';
import { Dimmer } from '../../../../shared/ui/Dimmer';

const mockPhotoUrl =
	'https://images.unsplash.com/photo-1517398825998-780ca786555f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

type PackPhotoUploadProps = {
	src: string;
	uploadEnabled: boolean;
	isPending: boolean;
	onUpload: (formData: FormData) => void;
};

const PhotoUpload = (props: PackPhotoUploadProps) => {
	const { src, uploadEnabled = false, isPending, onUpload } = props;
	const [showButton, setShowButton] = useState(false);

	const photoSource = src || mockPhotoUrl;
	const displayDimmer = uploadEnabled && (isPending || showButton);

	return (
		<Container
			onMouseOver={() => setShowButton(true)}
			onMouseLeave={() => setShowButton(false)}>
			<PackPhoto src={photoSource} alt="upload custom pack photo" />

			{isPending && <StyledLoader active inverted />}

			{uploadEnabled && showButton && (
				<UploadContainer>
					<UploadFile
						fileId="pack-photo-upload"
						fileName="packPhoto"
						isPending={isPending}
						onUpload={onUpload}
					/>
				</UploadContainer>
			)}
			<StyledDimmer active={displayDimmer} />
		</Container>
	);
};

export default PhotoUpload;

const PackPhoto = styled.img`
	width: 100%;
	height: 200px;
	object-cover: cover;
	border-radius: 15px;
`;

const StyledDimmer = styled(Dimmer)`
	top: 0px;
	width: 100%;
	height: 200px;
	border-radius: 15px;
`;

const UploadContainer = styled.div`
	position: absolute;
	top: calc(100px - 1.5em);
	left: calc(50% - 2em);
	z-index: 5;
`;

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
`;

const StyledLoader = styled(Loader)`
	&&& {
		top: calc(50% - 0em);
		left: calc(50% - 0.5em);
	}
`;
