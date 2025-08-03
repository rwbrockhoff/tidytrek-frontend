import { mx } from '@/styles/utils';

export const EmptyTableRow = () => {
	return (
		<tr className={mx.bgSecondary}>
			<td colSpan={24} />
		</tr>
	);
};
