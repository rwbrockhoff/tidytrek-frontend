import { FormGroup, FormField, Input, Icon } from "semantic-ui-react";

interface PackTagPropertiesProps {
  packLocationTag: string;
  packSeasonTag: string;
  packDurationTag: string;
  packMilesTag: string;
  handleFormChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const PackTagProperties = (props: PackTagPropertiesProps) => {
  const {
    packLocationTag,
    packSeasonTag,
    packDurationTag,
    packMilesTag,
    handleFormChange,
  } = props;
  return (
    <>
      <FormGroup widths={"equal"}>
        <FormField>
          <label>
            <Icon name="location arrow" />
            Location
          </label>
          <Input
            name="packLocationTag"
            value={packLocationTag ?? ""}
            onChange={handleFormChange}
            placeholder="Location"
          />
        </FormField>
        <FormField>
          <label>
            <Icon name="sun" />
            Season
          </label>
          <Input
            name="packSeasonTag"
            value={packSeasonTag ?? ""}
            onChange={handleFormChange}
            placeholder="Season"
          />
        </FormField>
      </FormGroup>

      <FormGroup widths={"equal"}>
        <FormField>
          <label>
            <Icon name="time" />
            Trip Duration
          </label>
          <Input
            name="packDurationTag"
            value={packDurationTag ?? ""}
            onChange={handleFormChange}
            placeholder="Trip Duration"
          />
        </FormField>
        <FormField>
          <label>
            <i
              className="fa-solid fa-person-hiking"
              style={{ paddingRight: "5px" }}
            />
            Distance With Pack
          </label>
          <Input
            name="packMilesTag"
            value={packMilesTag ?? ""}
            onChange={handleFormChange}
            placeholder="Location"
          />
        </FormField>
      </FormGroup>
    </>
  );
};

export default PackTagProperties;
