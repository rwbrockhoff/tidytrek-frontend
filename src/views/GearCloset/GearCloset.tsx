import { Header, Loader } from 'semantic-ui-react';
import './GearCloset.css';
import GearClosetList from '../../components/GearCloset/GearClosetList/GearClosetList';
import { useGetGearClosetQuery } from '../../redux/closet/closetApiSlice';

const GearCloset = () => {
	const { data, isLoading, isFetching } = useGetGearClosetQuery();
	const { gearClosetList, availablePacks } = data || {
		gearClosetList: [],
		availablePacks: [],
	};
	const loading = isLoading || isFetching;
	return (
		<div>
			<Header as="h1" textAlign="center" className="gear-closet-header">
				Gear Closet
			</Header>
			{!loading && (
				<GearClosetList gearClosetList={gearClosetList} availablePacks={availablePacks} />
			)}

			<Loader active={loading} inline="centered" />
		</div>
	);
};

export default GearCloset;
