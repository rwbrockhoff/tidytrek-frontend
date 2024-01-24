import { Header } from 'semantic-ui-react';
import { type PackItem, type Pack } from '../../redux/packs/packTypes';
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
			<Header as="h1" textAlign="center">
				Gear Closet
			</Header>
			<GearClosetList gearClosetList={gearClosetList} availablePacks={availablePacks} />
		</div>
	);
};

export default GearCloset;
