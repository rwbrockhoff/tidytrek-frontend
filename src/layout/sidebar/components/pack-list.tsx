import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { type PackListItem as PackListItemType } from '@/types/pack-types';
import { Drag, DragDropContext, DropResult } from '@/components';
import { Droppable } from 'react-beautiful-dnd';
import { PackListItem } from './pack-list-item';
import { StyledSeperator } from '../sidebar';
import { useMovePackMutation } from '@/queries/pack-queries';

import { encode } from '@/utils';
import { CreatePackMenu } from './create-pack-menu';

type PackListProps = {
	currentPackId: number | undefined;
	packList: PackListItemType[];
};

export const PackList = ({ currentPackId, packList }: PackListProps) => {
	const navigate = useNavigate();

	const { mutate: movePack } = useMovePackMutation();

	const handleGetPack = async (packId: number) => {
		const { pathname } = location;
		if (currentPackId === undefined) navigate('/');
		const encodedId = encode(packId);
		if (packId !== currentPackId) navigate(`/pack/${encodedId}`);
		if (pathname !== '/') navigate(`/pack/${encodedId}`);
	};

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;
		const sameIndex = destination.index === source.index;
		if (sameIndex) return;
		movePack({
			packId: draggableId,
			newIndex: destination.index,
			prevIndex: source.index,
		});
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable
					droppableId={'sidebar-pack-list'}
					type="packlist-item"
					// renderClone required in position absolute parent (sidebar)
					// in order to display item while isDragging
					renderClone={(provided, _snapshot, rubric) => {
						const index = rubric.source.index;
						const pack = packList[index];
						return (
							<StyledContainer
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}>
								<PackListItem pack={pack} onClick={handleGetPack} />
							</StyledContainer>
						);
					}}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{packList.map((pack: PackListItemType, index: number) => {
								return (
									<Drag key={pack.packId} draggableId={pack.packId} index={index}>
										<PackListItem pack={pack} onClick={handleGetPack} />
									</Drag>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<StyledSeperator my="4" />

			<CreatePackMenu />
		</div>
	);
};

const StyledContainer = styled.div`
	color: white;
`;
