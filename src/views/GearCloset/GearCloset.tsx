import { Header } from 'semantic-ui-react';
import './GearCloset.css';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import { useGetGearClosetQuery } from '../../queries/closetQueries';
import { useGetPackListQuery } from '../../queries/packQueries';
import { UserViewContext } from '../Dashboard/useUserContext';

const GearCloset = () => {
	const { data } = useGetGearClosetQuery();
	const { gearClosetList } = data || { gearClosetList: [] };
	const { data: packListData } = useGetPackListQuery();
	const { packList } = packListData || { packList: [] };

	return (
		<UserViewContext.Provider value={true}>
			<div>
				<Header as="h1" textAlign="center" className="gear-closet-header">
					Gear Closet
				</Header>

				<GearClosetList gearClosetList={gearClosetList} packList={packList} />
			</div>
		</UserViewContext.Provider>
	);
};

export default GearCloset;
