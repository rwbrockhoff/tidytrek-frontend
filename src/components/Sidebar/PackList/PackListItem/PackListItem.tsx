import { PackListItem as ListItem } from '../../../../types/packTypes';

type PackListItemProps = {
	pack: ListItem;
	index: number;
	onClick: (packId: number) => void;
};

const PackListItem = ({ pack, index, onClick }: PackListItemProps) => {
	return (
		<div key={pack.packId} onClick={() => onClick(pack.packId)}>
			<p>
				<i className="fa-solid fa-grip-vertical" />
				{pack.packName}
			</p>
		</div>
	);
};

export default PackListItem;
