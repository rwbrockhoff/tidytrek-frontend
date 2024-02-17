import './TableButtons.css';
import { useUserContext } from '../../../../views/Dashboard/useUserContext';

type WeightDropdownProps = {
	unit: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const WeightDropdown = (props: WeightDropdownProps) => {
	const userView = useUserContext();
	const { unit, onChange } = props;
	if (userView) {
		return (
			<select
				className="weight-unit-select"
				name="packItemUnit"
				value={unit}
				onChange={(e) => onChange(e)}>
				<option value={'oz'}>oz</option>
				<option value={'lb'}>lb</option>
				<option value={'g'}>g</option>
				<option value={'kg'}>kg</option>
			</select>
		);
	} else {
		return <p>{unit}</p>;
	}
};

export default WeightDropdown;
