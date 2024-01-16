import './PackList.css';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { PackListItem as PackListItemType } from '../../../redux/packs/packTypes';
import { RootState, AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import {
  addNewPack,
  getPack,
  movePack,
  getPackList,
} from '../../../redux/packs/packThunks';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import PackListItem from './PackListItem/PackListItem';
import { useEffect } from 'react';

const PackList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const packList = useSelector((state: RootState) => state.packs.packList);
  const currentPackId = useSelector(
    (state: RootState) => state.packs.pack.packId,
  );

  const handleClick = () => {
    dispatch(addNewPack());
  };

  useEffect(() => {
    dispatch(getPackList());
  }, [dispatch]);

  const handleGetPack = async (packId: number) => {
    const { pathname } = location;
    if (packId !== currentPackId) await dispatch(getPack(packId));
    if (pathname !== '/') navigate(`/packs/${packId}`);
  };

  const onDragEnd = (result: DropResult) => {
    const { draggableId, destination, source } = result;
    if (!destination) return;
    const sameIndex = destination.index === source.index;
    if (sameIndex) return;

    dispatch(movePack({ packId: draggableId, newIndex: destination.index }));
  };

  return (
    <div className="pack-list-container">
      <Header as="h3" className="pack-title">
        Packs
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'sidebar-pack-list'}>
          {(provided) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {packList.map((pack: PackListItemType, index: number) => {
                  return (
                    <PackListItem
                      index={index}
                      key={pack.packId}
                      pack={pack}
                      onClick={handleGetPack}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
      <Divider />
      <p onClick={handleClick}>
        <Icon name="add" />
        Create New Pack
      </p>
    </div>
  );
};

export default PackList;
