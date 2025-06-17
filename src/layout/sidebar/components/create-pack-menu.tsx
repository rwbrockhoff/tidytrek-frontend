import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './create-pack-menu.module.css';
import { PlusIcon, ImportIcon } from '@/components/ui';
import { useAddNewPackMutation } from '@/queries/pack-queries';
import { Button, Flex, Popover, Text } from '@radix-ui/themes';
import { encode } from '@/utils';
import { StyledMenu } from './styled-menu';
import { ImportPackDialog } from './import-pack-dialog';

export const CreatePackMenu = () => {
	const navigate = useNavigate();
	const { packId: paramPackId } = useParams();

	const addNewPackData = useAddNewPackMutation();
	const { mutate: addPack } = addNewPackData;

	useEffect(() => {
		// subscribe to new pack created event, redirect to new pack
		if (addNewPackData.isSuccess && addNewPackData.data) {
			if ('pack' in addNewPackData.data && paramPackId) {
				const { packId } = addNewPackData.data.pack;
				const encodedId = encode(packId);
				if (paramPackId !== encodedId) {
					addNewPackData.reset();
					navigate(`/pack/${encodedId}`);
				}
			}
		}
	}, [addNewPackData, paramPackId, navigate]);

	return (
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="ghost" color="gray" className={styles.newPackButton}>
					<PlusIcon />
					Create New Pack
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<StyledMenu>
					<li onClick={() => addPack()}>
						<Text>
							<Flex display="inline-flex" align="center">
								<PlusIcon />
								Create New Pack
							</Flex>
						</Text>
					</li>
					<li>
						<ImportPackDialog>
							<Text>
								<Flex display="inline-flex" align="center">
									<ImportIcon />
									Import Pack
								</Flex>
							</Text>
						</ImportPackDialog>
					</li>
				</StyledMenu>
			</Popover.Content>
		</Popover.Root>
	);
};
