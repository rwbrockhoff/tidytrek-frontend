import { Heading, Button } from '@radix-ui/themes';
import { PlusIcon } from '@/components/ui';
import styled from 'styled-components';
import { type PackListItem as PackListItemType } from '@/types/pack-types';
import { Drop, Drag } from '@/components';
import { PackListItem } from './pack-list-item';
import { StyledSeperator } from '../sidebar';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => void;
	addPack: () => void;
};

export const PackList = ({ packList, getPack, addPack }: PackListProps) => {
	return (
		<div>
			<Heading as="h3" size="5">
				Packs
			</Heading>

			<Drop droppableId={'sidebar-pack-list'} type="packlist-item">
				{packList.map((pack: PackListItemType, index: number) => {
					return (
						<Drag key={pack.packId} draggableId={pack.packId} index={index}>
							<PackListItem pack={pack} onClick={getPack} />
						</Drag>
					);
				})}
			</Drop>

			<StyledSeperator my="4" />

			<NewPackButton onClick={addPack}>
				<PlusIcon />
				Create New Pack
			</NewPackButton>
		</div>
	);
};

const NewPackButton = styled(Button)`
	background: transparent;
	color: white;
	padding: 0;
	cursor: pointer;
	&:hover {
		opacity: 0.7;
	}

	${({ theme: t }) =>
		t.mx.mobile(`
				font-size: 1em;
				margin-top: 1em;
		`)}
`;
