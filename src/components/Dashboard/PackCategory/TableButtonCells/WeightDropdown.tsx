import "./WeightDropdown.css";

interface WeightDropdownProps {
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const WeightDropdown = (props: WeightDropdownProps) => {
  const { unit, onChange } = props;
  return (
    <select
      className="weight-unit-select"
      name="packItemUnit"
      value={unit}
      onChange={(e) => onChange(e)}
    >
      <option value={"oz"}>oz</option>
      <option value={"lb"}>lb</option>
      <option value={"g"}>g</option>
      <option value={"kg"}>kg</option>
    </select>
  );
};

export default WeightDropdown;
