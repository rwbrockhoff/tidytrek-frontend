import styled from 'styled-components';
import { MdCloudUpload as UploadIcon } from 'react-icons/md';
import { ChangeEvent, useRef } from 'react';

type UploadFileProps = {
	fileId: string;
	fileType?: string;
	fileName: string;
	isPending: boolean | undefined;
	onUpload: ((formData: FormData) => void) | undefined;
};

export const UploadFile = (props: UploadFileProps) => {
	const { fileId, fileType = 'image/*', fileName, isPending, onUpload } = props;

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.target.files && e.target.files.length > 0 && formRef.current) {
			const file = e.target.files[0];
			const formData = new FormData(formRef.current);
			formData.append(fileName, file);
			onUpload && onUpload(formData);
			formRef?.current && formRef.current.reset();
		}
	};

	return (
		<form encType="multipart/form-data" ref={formRef} className="uploadFileForm">
			<UploadLabel htmlFor={fileId}>
				<UploadIcon />
			</UploadLabel>
			<UploadInput
				id={fileId}
				type="file"
				accept={fileType}
				onChange={handleFile}
				disabled={isPending}
			/>
		</form>
	);
};

const UploadLabel = styled.label`
	color: white;
	cursor: pointer;
	font-size: 2em;
	padding: 1em;
	svg {
		margin: 0;
	}
`;

const UploadInput = styled.input`
	display: none;
`;
