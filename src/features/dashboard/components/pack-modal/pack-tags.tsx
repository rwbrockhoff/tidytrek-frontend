import { type InputEvent } from '@/types/form-types';
import { Flex } from '@/components/layout';
import { TextField } from '@/components/alpine';

type PackTagsProps = {
	packLocationTag: string;
	packSeasonTag: string;
	packDurationTag: string;
	packDistanceTag: string;
	handleFormChange: (e: InputEvent) => void;
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
		<Flex className="justify-between mb-2">
			<TextField.Input
				name="packLocationTag"
				value={packLocationTag ?? ''}
				onChange={handleFormChange}
				label="Location"
				placeholder="Location"
				width="23%"
			/>

			<TextField.Input
				name="packSeasonTag"
				value={packSeasonTag ?? ''}
				onChange={handleFormChange}
				label="Season"
				placeholder="Season"
				width="23%"
			/>

			<TextField.Input
				name="packDurationTag"
				value={packDurationTag ?? ''}
				onChange={handleFormChange}
				label="Trip Duration"
				placeholder="2-3 Nights"
				width="23%"
			/>

			<TextField.Input
				name="packDistanceTag"
				value={packDistanceTag ?? ''}
				onChange={handleFormChange}
				label="Distance with Pack"
				placeholder="200 miles"
				width="23%"
			/>
		</Flex>
	);
};
