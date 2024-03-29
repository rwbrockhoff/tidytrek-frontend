import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';

type UploadFileProps = {
	fileId: string;
	fileType?: string;
	fileName: string;
	isPending: boolean | undefined;
	onUpload: ((formData: FormData) => void) | undefined;
};

const UploadFile = (props: UploadFileProps) => {
	const {
		fileId,
		fileType = 'image/jpg, image/png',
		fileName,
		isPending,
		onUpload,
	} = props;

	const formRef = useRef<HTMLFormElement | null>(null);
	const [file, setFile] = useState<globalThis.File | null>();

	useEffect(() => {
		if (file && formRef?.current) {
			formRef.current.requestSubmit();
		}
	}, [file]);

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setFile(file);
		}
	};

	const handleSubmitForm = async (e: FormEvent) => {
		e.preventDefault();

		if (file) {
			const formData = new FormData();
			formData.append(fileName, file);
			onUpload && onUpload(formData);
			formRef?.current && formRef.current.reset();
			setFile(null);
		}
	};

	return (
		<div>
			<form encType="multipart/form-data" ref={formRef} onSubmit={handleSubmitForm}>
				<UploadLabel htmlFor={fileId}>
					<Icon name="cloud upload" />
				</UploadLabel>
				<UploadInput
					id={fileId}
					type="file"
					accept={fileType}
					onChange={handleFile}
					disabled={isPending}
				/>
			</form>
		</div>
	);
};

export default UploadFile;

const UploadLabel = styled.label`
	color: white;
	cursor: pointer;
	font-size: 2em;
	.icon {
		margin: 0;
	}
`;

const UploadInput = styled.input`
	display: none;
`;
