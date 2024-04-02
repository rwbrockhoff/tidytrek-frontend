import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dimmer, defaultPackPhoto, Spinner, DeleteButton } from '@/components/ui';
import { UploadFile } from '@/components';

type PackPhotoProps = {
	src: string;
	uploadEnabled: boolean;
	isPending: boolean;
	onUpload: (formData: FormData) => void;
	onDelete?: () => void;
};

export const PackPhoto = (props: PackPhotoProps) => {
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
			{displayDeleteButton && <DeleteButton disabled={isPending} onClick={onDelete} />}

			<StyledPackPhoto src={photoSource} alt="upload custom pack photo" />

			<Spinner active={isPending} absoluteCenter size="3" />

			{uploadEnabled && (
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
	${({ theme: t }) => t.mx.absoluteCenter()}
	z-index: 5;
`;

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
`;
