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
import { usePricingContext } from '../../../views/Dashboard/hooks/useViewerContext';

type PackSummaryPanelProps = {
	totalWeight: number;
	descriptivePackWeight: { baseWeight: string; consumables: string; wornWeight: string };
	totalPackPrice: string;
};

const PackSummaryPanel = (props: PackSummaryPanelProps) => {
	const { totalWeight, descriptivePackWeight, totalPackPrice } = props;
	const { baseWeight, consumables, wornWeight } = descriptivePackWeight;
	const showPrices = usePricingContext();

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
						<PopupListItem style={{ cursor: 'pointer' }}>
							<LightIcon name="info circle" /> Total Weight:{' '}
							<StyledLabel>{totalWeight} lbs</StyledLabel>
						</PopupListItem>
					</div>
				}>
				<PopupContent>
					<List relaxed>
						<PopupListItem>
							<p>
								<Icon color="teal" name="balance scale" />
								Base Weight:
							</p>
							<StyledLabel>{baseWeight}</StyledLabel>
						</PopupListItem>

						<PopupListItem>
							<p>
								<Icon name="food" color="olive" />
								Consumables:
							</p>
							<StyledLabel>{consumables}</StyledLabel>
						</PopupListItem>
						<PopupListItem>
							<p>
								<i className={`fa-solid fa-shirt`} />
								Worn Weight:
							</p>
							<StyledLabel>{wornWeight}</StyledLabel>
						</PopupListItem>
						<Divider />
						<PopupListItem>
							<p>Total Weight: </p> <StyledLabel>{totalWeight} lbs</StyledLabel>
						</PopupListItem>
					</List>
				</PopupContent>
			</Popup>

			{showPrices && (
				<PopupListItem style={{ marginTop: 10 }}>
					<LightIcon name="money" style={{ marginLeft: 0 }} /> Total Price:
					<StyledLabel>{totalPackPrice}</StyledLabel>
				</PopupListItem>
			)}
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

const PopupListItem = styled(ListItem)`
	&&& {
		font-size: 0.9em;
		display: flex;
		align-items: baseline;
		p {
			margin-right: 10px;
			text-align: left;
			i {
				margin-right: 10px;
			}
			.fa-solid.fa-shirt {
				${({ theme }) => theme.mx.themeColor('tidyBlue')}
			}
		}
	}
`;

const StyledLabel = styled(Label)`
	&& {
		margin-left: auto;
	}
`;
