import { type InputEvent } from '@/types/form-types';
import { FormField } from '@/components/ui';
import { Flex } from '@radix-ui/themes';

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
		<Flex justify="between" mb="2">
			<FormField
				name="packLocationTag"
				value={packLocationTag ?? ''}
				onChange={handleFormChange}
				label="Location"
				placeholder="Location"
				width="23%"
			/>

			<FormField
				name="packSeasonTag"
				value={packSeasonTag ?? ''}
				onChange={handleFormChange}
				label="Season"
				placeholder="Season"
				width="23%"
			/>

			<FormField
				name="packDurationTag"
				value={packDurationTag ?? ''}
				onChange={handleFormChange}
				label="Trip Duration"
				placeholder="2-3 Nights"
				width="23%"
			/>

			<FormField
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
