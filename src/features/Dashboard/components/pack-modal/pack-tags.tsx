import { FormField } from '@/components/ui';

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
			<div>
				<FormField
					name="packLocationTag"
					value={packLocationTag ?? ''}
					onChange={handleFormChange}
					label="Location"
					placeholder="Location"
				/>

				<FormField
					name="packSeasonTag"
					value={packSeasonTag ?? ''}
					onChange={handleFormChange}
					label="Season"
					placeholder="Season"
				/>
			</div>
			<div>
				<FormField
					name="packDurationTag"
					value={packDurationTag ?? ''}
					onChange={handleFormChange}
					label="Trip Duration"
					placeholder="2-3 Nights"
				/>

				<FormField
					name="packDistanceTag"
					value={packDistanceTag ?? ''}
					onChange={handleFormChange}
					label="Distance with Pack"
					placeholder="200 miles"
				/>
			</div>
		</>
	);
};
