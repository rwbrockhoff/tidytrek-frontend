import { Header } from 'semantic-ui-react';
import './GearCloset.css';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import { useGetGearClosetQuery } from '../../redux/closet/closetApiSlice';

const GearCloset = () => {
	const { data } = useGetGearClosetQuery();
	const { gearClosetList, availablePacks } = data || {
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
