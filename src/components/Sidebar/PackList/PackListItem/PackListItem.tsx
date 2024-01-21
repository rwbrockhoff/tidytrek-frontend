import { Draggable } from 'react-beautiful-dnd';
import { PackListItem as ListItem } from '../../../../redux/packs/packTypes';

interface PackListItemProps {
  index: number;
  pack: ListItem;
  onClick: (packId: number) => void;
}

const PackListItem = (props: PackListItemProps) => {
  const { index, pack, onClick } = props;
  return (
    <Draggable key={pack.packId} draggableId={`${pack.packId}`} index={index}>
      {(provided) => (
        <div
          key={pack.packId}
          onClick={() => onClick(pack.packId)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>
            <i className="fa-solid fa-grip-vertical" />
            {pack.packName}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default PackListItem;
