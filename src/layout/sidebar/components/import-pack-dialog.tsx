import { BackpackIcon, FormField, Message } from '@/components/ui';
import { useImportPackMutation } from '@/queries/pack-queries';
import { type InputEvent } from '@/types/form-types';
import { Form } from '@radix-ui/react-form';
import { Dialog, Flex, Button } from '@radix-ui/themes';
import { Spinner } from '@/components/ui';
import { FormEvent, useState } from 'react';
import { packUrlSchema, z } from '@/schemas';
import { clearZodErrors, useAxiosErrorMessage, useZodError } from '@/hooks';
import styled from 'styled-components';

const importPackUrlSchema = z
	.object({
		packUrl: packUrlSchema,
	})
	.required();

type ImportPackDialogProps = {
	children: React.ReactNode;
};

type FormInputs = { packUrl: string };

export const ImportPackDialog = (props: ImportPackDialogProps) => {
	const { children } = props;

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

	const handleClearDialog = (open: boolean) => {
		if (!open) {
			setPackUrl('');
			resetImportMutation();
		}
	};

	const serverErrorMessage = useAxiosErrorMessage(importError);
	return (
		<Dialog.Root onOpenChange={handleClearDialog}>
			<Dialog.Trigger>{children}</Dialog.Trigger>

			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>Import Pack</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					You can import a shareable pack link from Lighterpack below.
				</Dialog.Description>
				<Form onSubmit={handleSubmit}>
					<Flex direction="column">
						<FormField
							name="packUrl"
							value={packUrl}
							placeholder="lighterpack.com/r/yourpack"
							onChange={handleInput}
							label="Pack URL"
							error={formErrors.packUrl}
						/>
					</Flex>

					{isSuccessImport && (
						<Message messageType="success" text="Your pack was imported successfully." />
					)}

					{isImportError && <Message messageType="error" text={serverErrorMessage} />}

					<Flex gap="3" mt="6" justify="end">
						<Dialog.Close>
							<Button variant="soft" color="gray">
								{isSuccessImport ? 'Close' : 'Cancel'}
							</Button>
						</Dialog.Close>

						<StyledImportButton type="submit" disabled={isPendingImport}>
							{isPendingImport ? (
								<Spinner active size="1" />
							) : (
								<>
									<BackpackIcon /> Import Pack
								</>
							)}
						</StyledImportButton>
					</Flex>
				</Form>
			</Dialog.Content>
		</Dialog.Root>
	);
};

const StyledImportButton = styled(Button)`
	background-color: var(--jade-9);
	min-width: 100px;
`;
