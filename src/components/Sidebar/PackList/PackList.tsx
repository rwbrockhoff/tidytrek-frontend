import './PackList.css';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { type PackListItem as PackListItemType } from '../../../types/packTypes';
import PackListItem from './PackListItem/PackListItem';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => Promise<void>;
	addPack: () => void;
	onDragEnd: (result: any) => void;
};

const PackList = ({ packList, getPack, addPack, onDragEnd }: PackListProps) => {
	return (
		<div className="pack-list-container">
			<Header as="h3" className="pack-title">
				Packs
			</Header>

			{packList.map((pack: PackListItemType, index: number) => {
				return (
					<PackListItem
						key={pack.packId || index}
						index={index}
						pack={pack}
						onClick={getPack}
					/>
				);
			})}

			<Divider />
			<p onClick={addPack} className="add-new-pack-button">
				<Icon name="add" />
				Create New Pack
			</p>
		</div>
	);
};

export default PackList;
