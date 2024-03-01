import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UploadFile from '../../../../shared/ui/UploadFile';
import { Button, Loader } from 'semantic-ui-react';
import { Dimmer } from '../../../../shared/ui/Dimmer';
import { defaultPackPhoto } from '../../../../shared/ui/defaultPhotos';
import { flexCenter } from '../../../../shared/mixins/mixins';

type PackPhotoProps = {
	src: string;
	uploadEnabled: boolean;
	isPending: boolean;
	onUpload: (formData: FormData) => void;
	onDelete?: () => void;
};

const PackPhoto = (props: PackPhotoProps) => {
	const { src, uploadEnabled = false, isPending, onUpload, onDelete } = props;
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (isPending) setShowButton(false);
	}, [isPending]);

	const photoSource = src || defaultPackPhoto;
	const displayDimmer = uploadEnabled && (isPending || showButton);
	const displayDeleteButton = src && onDelete && showButton && !isPending;
	return (
		<Container
			onMouseOver={() => setShowButton(true)}
			onMouseLeave={() => setShowButton(false)}>
			{displayDeleteButton && (
				<DeleteButton
					circular
					icon="delete"
					size="mini"
					onClick={onDelete}
					disabled={isPending}
				/>
			)}

			<StyledPackPhoto src={photoSource} alt="upload custom pack photo" />

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

export default PackPhoto;

const StyledPackPhoto = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const StyledDimmer = styled(Dimmer)`
	top: 0px;
	width: 100%;
	height: 200px;
`;

const UploadContainer = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 200px;
	${flexCenter}
	z-index: 5;
`;

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
`;

const StyledLoader = styled(Loader)`
	&&& {
		width: 100%;
		${flexCenter}
	}
`;

const DeleteButton = styled(Button)`
	position: absolute;
	z-index: 10;
	top: -10px;
	right: -10px;
`;
