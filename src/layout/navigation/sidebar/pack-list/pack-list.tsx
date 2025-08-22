import { useNavigate } from 'react-router-dom';
import { Separator } from '@radix-ui/themes';
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

import { type PackListItem as PackListItemType } from '@/types/pack-types';
import { PackListItem } from './pack-list-item';
import { CreatePackMenu } from './create-pack-menu/create-pack-menu';
import { encode } from '@/utils';
import { usePackListDragHandler } from './use-pack-list-drag-handler';

type PackListProps = {
	currentPackId: number | undefined;
	packList: PackListItemType[];
};

export const PackList = ({ currentPackId, packList }: PackListProps) => {
	const navigate = useNavigate();
	const sensors = useSensors(useSensor(PointerSensor));
	const { localPackList, activeId, handleDragStart, handleDragEnd } =
		usePackListDragHandler(packList);

	const handleGetPack = (packId: number) => {
		const encodedId = encode(packId);

		if (currentPackId === undefined) navigate('/', { viewTransition: true });
		// navigate to pack (if different pack or app path)
		else if (packId !== currentPackId || location.pathname !== '/') {
			navigate(`/pack/${encodedId}`, { viewTransition: true });
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}>
			<div>
				<SortableContext
					items={localPackList.map((pack) => pack.packId.toString())}
					strategy={verticalListSortingStrategy}>
					<div>
						{localPackList.map((pack: PackListItemType) => {
							return (
								<PackListItem key={pack.packId} pack={pack} onClick={handleGetPack} />
							);
						})}
					</div>
				</SortableContext>

				<Separator my="4" />
				<CreatePackMenu />
			</div>

			{createPortal(
				<DragOverlay>
					{activeId && (
						<div style={{ opacity: 0.9 }}>
							{localPackList.find((p) => p.packId.toString() === activeId)?.packName}
						</div>
					)}
				</DragOverlay>,
				document.body,
			)}
		</DndContext>
	);
};
