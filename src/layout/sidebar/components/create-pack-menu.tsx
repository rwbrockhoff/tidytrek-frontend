import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlusIcon, ImportIcon } from '@/components/ui';
import { useAddNewPackMutation } from '@/queries/pack-queries';
import { Button, Flex, Popover, Text } from '@radix-ui/themes';
import { encode } from '@/utils';
import { StyledMenu } from './styled-menu';

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
				<NewPackButton variant="ghost">
					<PlusIcon />
					Create New Pack
				</NewPackButton>
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
						<Text>
							<Flex display="inline-flex" align="center">
								<ImportIcon />
								Import Pack
							</Flex>
						</Text>
					</li>
				</StyledMenu>
			</Popover.Content>
		</Popover.Root>
	);
};

const NewPackButton = styled(Button)`
	background: transparent;
	color: white;
	cursor: pointer;
	&:hover {
		filter: var(--hover-dark-2);
	}
	${({ theme: t }) =>
		t.mx.mobile(`
				font-size: 1em;
				margin-top: 1em;
		`)}
`;
