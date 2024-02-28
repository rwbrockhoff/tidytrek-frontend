import {
	List,
	ListItem,
	Label,
	Icon,
	Divider,
	Popup,
	PopupContent,
} from 'semantic-ui-react';

type PackSummaryPanelProps = {
	totalWeight: number;
	descriptivePackWeight: { baseWeight: string; consumables: string; wornWeight: string };
	totalPackPrice: string;
};

const PackSummaryPanel = (props: PackSummaryPanelProps) => {
	const { totalWeight, descriptivePackWeight, totalPackPrice } = props;
	const { baseWeight, consumables, wornWeight } = descriptivePackWeight;
	return (
		<Popup
			mouseEnterDelay={700}
			on="hover"
			pinned
			position="top center"
			hideOnScroll
			trigger={
				<div>
					<ListItem className="chart-display-list-item" style={{ cursor: 'pointer' }}>
						<Icon name="info circle" style={{ marginRight: 5, opacity: 0.2 }} /> Total
						Weight: <Label>{totalWeight} lbs</Label>
					</ListItem>
					<ListItem className="chart-display-list-item" style={{ marginTop: 10 }}>
						<Icon name="money" style={{ marginRight: 5, opacity: 0.2 }} /> Total Price:{' '}
						<Label>{totalPackPrice}</Label>
					</ListItem>
				</div>
			}>
			<PopupContent>
				<List className="chart-display-popup-list" relaxed>
					<ListItem className="chart-display-list-item">
						<p>
							<Icon color="teal" name="balance scale" />
							Base Weight:
						</p>
						<Label>{baseWeight}</Label>
					</ListItem>

					<ListItem className="chart-display-list-item">
						<p>
							<Icon name="food" color="olive" />
							Consumables:
						</p>
						<Label>{consumables}</Label>
					</ListItem>
					<ListItem className="chart-display-list-item">
						<p>
							<i className={`fa-solid fa-shirt`} />
							Worn Weight:
						</p>
						<Label>{wornWeight}</Label>
					</ListItem>
					<Divider />
					<ListItem className="chart-display-list-item">
						<p>Total Weight: </p> <Label>{totalWeight} lbs</Label>
					</ListItem>
				</List>
			</PopupContent>
		</Popup>
	);
};

export default PackSummaryPanel;
