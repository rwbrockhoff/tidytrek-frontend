import { Alert } from '@/components/ui';
import { TextField, Button, Modal } from '@/components/alpine';
import { BackpackIcon } from '@/components/icons';
import { useImportPackMutation } from '@/queries/pack-queries';
import { type InputEvent } from '@/types/form-types';
import { Form } from '@radix-ui/react-form';
import { Flex, Stack } from '@/components/layout';
import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { packImportUrlSchema } from '@/schemas/pack-schemas';
import { extractErrorMessage } from '@/utils/error-utils';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';
import styles from './import-pack-dialog.module.css';

const importPackUrlSchema = z
	.object({
		packUrl: packImportUrlSchema,
	})
	.required();

type ImportPackDialogProps = {
	isOpen: boolean;
	onClose: () => void;
};

type FormInputs = { packUrl: string };

export const ImportPackDialog = (props: ImportPackDialogProps) => {
	const { isOpen, onClose } = props;

	const [packUrl, setPackUrl] = useState('');

	const {
		mutate: importPack,
		isPending: isPendingImport,
		isSuccess: isSuccessImport,
		error: importError,
		isError: isImportError,
		reset: resetImportMutation,
	} = useImportPackMutation();

	const { formErrors, updateFormErrors, resetFormErrors, primaryError } =
		useZodError<FormInputs>(['packUrl']);

	const handleInput = (e: InputEvent) => {
		setPackUrl(e.target.value);
		// clear any errors for given input
		if (primaryError.error) handleClearErrors(e);
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors<FormInputs>(e, formErrors, resetFormErrors);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = importPackUrlSchema.safeParse({ packUrl });
		// handle url validation
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return updateFormErrors(result);
		}
		// import validated URL and clear form
		importPack(packUrl);
		setPackUrl('');
	};

	const handleClearDialog = () => {
		setPackUrl('');
		resetImportMutation();
		onClose();
	};

	const serverErrorMessage = extractErrorMessage(importError);

	return (
		<Modal.Root open={isOpen} onOpenChange={handleClearDialog}>
			<Modal.Overlay />
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>
						<Flex className="items-center gap-2">
							<BackpackIcon />
							Import Pack
						</Flex>
					</Modal.Title>
					<Modal.Description>
						You can import a shareable pack link from Lighterpack below:
					</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<Form id="import-form" onSubmit={handleSubmit}>
						<Stack>
							<TextField.Input
								name="packUrl"
								value={packUrl}
								placeholder="lighterpack.com/r/yourpack"
								onChange={handleInput}
								label="Pack URL"
								error={formErrors.packUrl}
							/>
						</Stack>

						{isSuccessImport && (
							<Alert variant="success" className="my-4" iconLeft={<BackpackIcon />}>
								Your pack was imported successfully.
							</Alert>
						)}

						{isImportError && <Alert variant="error" className="my-4">{serverErrorMessage}</Alert>}
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="outline" color="secondary" onClick={handleClearDialog}>
						{isSuccessImport ? 'Close' : 'Cancel'}
					</Button>
					<Button
						type="submit"
						form="import-form"
						disabled={isPendingImport}
						loading={isPendingImport}
						iconLeft={!isPendingImport ? <BackpackIcon /> : undefined}
						className={styles.importButton}>
						Import Pack
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
