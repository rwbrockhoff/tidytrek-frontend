import styled from 'styled-components';
import { useUserContext } from '../../../../views/Dashboard/hooks/useUserContext';

type WeightDropdownProps = {
	unit: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const WeightDropdown = (props: WeightDropdownProps) => {
	const userView = useUserContext();
	const { unit, onChange } = props;
	if (userView) {
		return (
			<StyledSelect name="packItemUnit" value={unit} onChange={(e) => onChange(e)}>
				<option value={'oz'}>oz</option>
				<option value={'lb'}>lb</option>
				<option value={'g'}>g</option>
				<option value={'kg'}>kg</option>
			</StyledSelect>
		);
	} else {
		return <p>{unit}</p>;
	}
};

export default WeightDropdown;

const StyledSelect = styled.select`
	background-color: transparent;
	color: #000000af;
	border-radius: 5px;
	border: none;
	outline: none;
`;
