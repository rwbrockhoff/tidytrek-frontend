import { Header } from 'semantic-ui-react';
import './GearCloset.css';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import { useGetGearClosetQuery } from '../../queries/closetQueries';

const GearCloset = () => {
	const { data: response } = useGetGearClosetQuery();
	const { gearClosetList, availablePacks } = response?.data || {
		gearClosetList: [],
		availablePacks: [],
	};

	return (
		<div>
			<Header as="h1" textAlign="center" className="gear-closet-header">
				Gear Closet
			</Header>

			<GearClosetList gearClosetList={gearClosetList} availablePacks={availablePacks} />
		</div>
	);
};

export default GearCloset;
