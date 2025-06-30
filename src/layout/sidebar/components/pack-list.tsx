import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Separator } from '@radix-ui/themes';

import { type PackListItem as PackListItemType } from '@/types/pack-types';
import { DragDropContext, DropResult } from '@/components';
import { PackListItem } from './pack-list-item';
import { CreatePackMenu } from './create-pack-menu';
import { useMovePackMutation } from '@/queries/pack-queries';
import { packListKeys } from '@/queries/query-keys';
import { encode, calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';

type PackListProps = {
	currentPackId: number | undefined;
	packList: PackListItemType[];
};

export const PackList = ({ currentPackId, packList }: PackListProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: movePack } = useMovePackMutation();

	const handleGetPack = (packId: number) => {
		const encodedId = encode(packId);

		if (currentPackId === undefined) navigate('/');
		// navigate to pack (if different pack or app path)
		else if (packId !== currentPackId || location.pathname !== '/') {
			navigate(`/pack/${encodedId}`);
		}
	};

	const handleOnDragEnd = (result: DropResult): void => {
		const { draggableId, destination, source } = result;
		if (!destination) return;
		if (destination.index === source.index) return;

		// Optimistic update for UI
		applySynchronousDragUpdate<{ packList: PackListItemType[] }>(
			queryClient,
			packListKeys.all,
			source.index,
			destination.index,
			'packList',
		);

		// Calculate adjacent packs for fractional indexing
		const { prevItem: prevPack, nextItem: nextPack } = calculateAdjacentItems(
			packList,
			source.index,
			destination.index,
		);

		movePack({
			packId: draggableId,
			prevPackIndex: prevPack?.packIndex,
			nextPackIndex: nextPack?.packIndex,
		});
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable
					droppableId={'sidebar-pack-list'}
					type="packlist-item"
					// renderClone required to display pack item list items while dragging
					// parent component is absolute positioned, Dnd requires renderClone
					renderClone={(provided, _snapshot, rubric) => {
						const index = rubric.source.index;
						const pack = packList[index];
						return (
							<div {...provided.draggableProps} ref={provided.innerRef}>
								<PackListItem
									pack={pack}
									onClick={handleGetPack}
									dragProps={{ ...provided.dragHandleProps }}
								/>
							</div>
						);
					}}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{packList.map((pack: PackListItemType, index: number) => {
								return (
									<Draggable
										key={pack.packId}
										draggableId={`${pack.packId}`}
										index={index}>
										{(provided) => (
											<div ref={provided.innerRef} {...provided.draggableProps}>
												<PackListItem
													pack={pack}
													onClick={handleGetPack}
													dragProps={{ ...provided.dragHandleProps }}
												/>
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<Separator my="4" />

			<CreatePackMenu />
		</div>
	);
};
