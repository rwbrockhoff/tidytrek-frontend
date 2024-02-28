import {
	List,
	ListItem,
	Label,
	Icon,
	Divider,
	Popup,
	PopupContent,
} from 'semantic-ui-react';
import styled from 'styled-components';

type PackSummaryPanelProps = {
	totalWeight: number;
	descriptivePackWeight: { baseWeight: string; consumables: string; wornWeight: string };
	totalPackPrice: string;
};

const PackSummaryPanel = (props: PackSummaryPanelProps) => {
	const { totalWeight, descriptivePackWeight, totalPackPrice } = props;
	const { baseWeight, consumables, wornWeight } = descriptivePackWeight;
	return (
		<>
			<Popup
				mouseEnterDelay={700}
				on="hover"
				pinned
				position="top center"
				hideOnScroll
				trigger={
					<div>
						<ListItem className="chart-display-list-item" style={{ cursor: 'pointer' }}>
							<LightIcon name="info circle" /> Total Weight:{' '}
							<Label>{totalWeight} lbs</Label>
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
			<ListItem className="chart-display-list-item" style={{ marginTop: 10 }}>
				<LightIcon name="money" style={{ marginLeft: 0 }} /> Total Price:{' '}
				<Label>{totalPackPrice}</Label>
			</ListItem>
		</>
	);
};

export default PackSummaryPanel;

const LightIcon = styled(Icon)`
	&&& {
		opacity: 0.2;
		margin-right: 5px;
	}
`;
