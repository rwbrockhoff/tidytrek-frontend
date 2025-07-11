import styles from './upload-file.module.css';
import { mx } from '@/styles/utils';
import { UploadIcon } from '@/components/ui';
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
			<label htmlFor={fileId} className={styles.uploadLabel}>
				<UploadIcon size={24} />
			</label>
			<input
				id={fileId}
				type="file"
				accept={fileType}
				onChange={handleFile}
				disabled={isPending}
				className={mx.hidden}
			/>
		</form>
	);
};
