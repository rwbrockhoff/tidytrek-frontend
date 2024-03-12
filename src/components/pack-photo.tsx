import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Loader } from '@/components/ui/TidyUI';
import { Dimmer, defaultPackPhoto } from '@/components/ui';
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

			{isPending && <Loader active={isPending} inverted />}

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

const DeleteButton = styled(Button)`
	position: absolute;
	z-index: 10;
	top: -10px;
	right: -10px;
`;
