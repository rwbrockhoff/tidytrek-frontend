import { useParams, useNavigate } from 'react-router-dom';
import { type Pack } from '@/types/pack-types';
import { Heading } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { SaveIcon, BackArrow } from '@/components/ui/icons';
import { usePackForm } from '../../hooks/use-pack-form';
import { PackForm } from '../../components/pack-form/pack-form';
import { PackDelete } from '../../components/pack-delete/pack-delete';
import { useGetPackQuery } from '@/queries/pack-queries';
import { Spinner } from '@/components/ui';

import styles from './pack-edit.module.css';

export const PackEdit = () => {
	const { packId } = useParams<{ packId: string }>();
	const navigate = useNavigate();

	const { data: packData, isLoading, error } = useGetPackQuery(packId);
	const pack = packData?.pack;

	const { modifiedPack, handleFormChange, handleCheckBox, handleSubmitPack } =
		usePackForm(pack || ({} as Pack));

	const handleSave = () => {
		handleSubmitPack();
		navigate(`/pack/${packId}`);
	};

	const handleCancel = () => {
		navigate(`/pack/${packId}`);
	};

	if (isLoading) return <Spinner />;
	if (error || !pack) return <div>Pack not found</div>;

	return (
		<div className={styles.pageContainer}>
			<div className={styles.actionHeader}>
				<Button variant="ghost" onClick={handleCancel} iconLeft={<BackArrow />}>
					Back
				</Button>
			</div>
			<div className={styles.header}>
				<Heading size="5">Edit Pack</Heading>
			</div>

			<PackForm
				pack={modifiedPack}
				handleFormChange={handleFormChange}
				handleCheckBox={handleCheckBox}
			/>

			<div className={styles.actionButtons}>
				<Button onClick={handleSave} size="md">
					<SaveIcon />
					Save Pack
				</Button>

				<PackDelete pack={pack} buttonSize="md" />
			</div>
		</div>
	);
};
