import { PackListItem as ListItem } from '../../../../types/packTypes';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { dragTypes } from '../../../../shared/DragDropKit';

type PackListItemProps = {
	pack: ListItem;
	index: number;
	onClick: (packId: number) => void;
};

const PackListItem = ({ pack, index, onClick }: PackListItemProps) => {
	const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
		id: pack.packId,
		data: { type: dragTypes.packListItem, index, pack },
	});

	const style = { transition, transform: CSS.Translate.toString(transform), zIndex: 5 };

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			key={pack.packId}
			onClick={() => onClick(pack.packId)}>
			<p>
				<i className="fa-solid fa-grip-vertical" />
				{pack.packName}
			</p>
		</div>
	);
};

export default PackListItem;
