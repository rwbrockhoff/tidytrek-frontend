import { Icon } from 'semantic-ui-react';
import { useUserContext } from '../../../views/Dashboard/useUserContext';

const PackPublicTag = ({ packPublic }: { packPublic: boolean }) => {
	const userView = useUserContext();

	if (!userView) return null;

	if (packPublic) {
		return (
			<p style={{ opacity: 0.4 }}>
				<Icon name="binoculars" /> Public
			</p>
		);
	} else {
		return (
			<p style={{ opacity: 0.4 }}>
				<Icon name="hide" /> Private
			</p>
		);
	}
};

export default PackPublicTag;
