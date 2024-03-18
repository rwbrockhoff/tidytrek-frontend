import { Badge, Flex } from '@radix-ui/themes';
import { LocationIcon, SeasonIcon, DurationIcon, HikingIcon } from './ui';
import { Pack } from '@/types/pack-types';

export const PackLabels = ({ pack }: { pack: Pack }) => {
	const { packLocationTag, packDurationTag, packSeasonTag, packDistanceTag } = pack;

	return (
		<Flex wrap="wrap" mt="3">
			{packLocationTag && <PackLabel name={packLocationTag} icon={<LocationIcon />} />}

			{packSeasonTag && <PackLabel name={packSeasonTag} icon={<SeasonIcon />} />}

			{packDurationTag && <PackLabel name={packDurationTag} icon={<DurationIcon />} />}

			{packDistanceTag && <PackLabel name={packDistanceTag} icon={<HikingIcon />} />}
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
