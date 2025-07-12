import { Badge, Flex } from '@radix-ui/themes';
import { LocationIcon, SeasonIcon, DurationIcon, HikingIcon } from '@/components/icons';
import { Pack } from '@/types/pack-types';

export const PackLabels = ({ pack }: { pack: Pack }) => {
	const { packLocationTag, packDurationTag, packSeasonTag, packDistanceTag } = pack;

	return (
		<Flex wrap="wrap" mt="3">
			{packLocationTag && (
				<PackLabel name={packLocationTag} icon={<LocationIcon size={12} />} />
			)}

			{packSeasonTag && (
				<PackLabel name={packSeasonTag} icon={<SeasonIcon size={12} />} />
			)}

			{packDurationTag && (
				<PackLabel name={packDurationTag} icon={<DurationIcon size={12} />} />
			)}

			{packDistanceTag && (
				<PackLabel name={packDistanceTag} icon={<HikingIcon size={12} />} />
			)}
		</Flex>
	);
};

type PackLabelProps = { name: string; icon: React.ReactNode };

const PackLabel = ({ name, icon }: PackLabelProps) => {
	return (
		<Badge mr="2" mb="2" color="gray" size="1">
			{icon}
			{name}
		</Badge>
	);
};
