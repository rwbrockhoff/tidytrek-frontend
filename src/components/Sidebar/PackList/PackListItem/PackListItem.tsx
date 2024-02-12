import { PackListItem as ListItem } from '../../../../types/packTypes';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
};

const PackListItem = ({ pack, onClick }: PackListItemProps) => {
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
