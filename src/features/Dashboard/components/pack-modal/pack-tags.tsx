import { DurationIcon, HikingIcon, LocationIcon, SeasonIcon } from '@/components/ui';
import { FormGroup, FormField, Input } from 'semantic-ui-react';

type PackTagsProps = {
	packLocationTag: string;
	packSeasonTag: string;
	packDurationTag: string;
	packDistanceTag: string;
	handleFormChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
};

export const PackTags = (props: PackTagsProps) => {
	const {
		packLocationTag,
		packSeasonTag,
		packDurationTag,
		packDistanceTag,
		handleFormChange,
	} = props;
	return (
		<>
			<FormGroup widths={'equal'}>
				<FormField>
					<label>
						<LocationIcon />
						Location
					</label>
					<Input
						name="packLocationTag"
						value={packLocationTag ?? ''}
						onChange={handleFormChange}
						placeholder="Location"
					/>
				</FormField>
				<FormField>
					<label>
						<SeasonIcon />
						Season
					</label>
					<Input
						name="packSeasonTag"
						value={packSeasonTag ?? ''}
						onChange={handleFormChange}
						placeholder="Season"
					/>
				</FormField>
			</FormGroup>

			<FormGroup widths={'equal'}>
				<FormField>
					<label>
						<DurationIcon />
						Trip Duration
					</label>
					<Input
						name="packDurationTag"
						value={packDurationTag ?? ''}
						onChange={handleFormChange}
						placeholder="Trip Duration"
					/>
				</FormField>
				<FormField>
					<label>
						<HikingIcon />
						Distance With Pack
					</label>
					<Input
						name="packDistanceTag"
						value={packDistanceTag ?? ''}
						onChange={handleFormChange}
						placeholder="Location"
					/>
				</FormField>
			</FormGroup>
		</>
	);
};
