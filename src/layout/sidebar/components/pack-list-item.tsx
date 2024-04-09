import { GripIcon } from '@/components/ui';
import { PackListItem as ListItem } from '@/types/pack-types';
import { Text } from '@radix-ui/themes';
import styled from 'styled-components';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
};

export const PackListItem = ({ pack, onClick }: PackListItemProps) => {
	return (
		<ItemContainer key={pack.packId} onClick={() => onClick(pack.packId)}>
			<StyledText size="3">
				<GripContainer>
					<GripIcon />
				</GripContainer>
				{pack.packName}
			</StyledText>
		</ItemContainer>
	);
};

const ItemContainer = styled.div`
	padding: 0.5em 0;
	cursor: pointer;
	&:hover svg {
		opacity: 0.6;
	}
`;

const StyledText = styled(Text)`
	position: relative;
	opacity: 1;
	svg {
		opacity: 0;
		&:hover {
			opacity: 0.6;
		}
	}
	&:hover {
		filter: var(--hover-dark-2);
	}
	${({ theme: t }) =>
		t.mx.mobile(`
				font-size: 1.2em;
		`)}
`;

const GripContainer = styled.span`
	height: 1em;
	position: absolute;
	left: -2em;
	padding: 0 0.5em;
	cursor: grab;
`;
