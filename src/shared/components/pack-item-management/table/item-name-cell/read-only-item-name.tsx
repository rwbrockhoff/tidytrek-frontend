import { ExternalLink } from '@/components/ui';
import { LinkIcon } from '@/components/icons';
import { mx, cn } from '@/styles/utils';

type ReadOnlyItemNameProps = {
	packItemName?: string;
	packItemUrl?: string;
};

export const ReadOnlyItemName = ({
	packItemName,
	packItemUrl,
}: ReadOnlyItemNameProps) => {
	if (packItemUrl) {
		return (
			<ExternalLink href={packItemUrl} className="flex items-center gap-1">
				<LinkIcon className="flex-shrink-0" />
				<span className={cn(mx.textEllipsis, mx.textInherit)}>{packItemName || packItemUrl || 'Pack Item'}</span>
			</ExternalLink>
		);
	}

	return <span className={cn(mx.textEllipsis, 'px-2 block')}>{packItemName || 'Name'}</span>;
};
