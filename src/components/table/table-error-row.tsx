import { type FormError } from '@/types/form-types';
import styled from 'styled-components';
import { Table, Flex, Text } from '@radix-ui/themes';
import { WarningIcon } from '../ui';

export const TableErrorRow = ({ error }: { error: FormError }) => {
	return (
		<ErrorRow $hasError={error.error}>
			<ErrorCell $hasError={error.error} colSpan={24} valign="middle">
				<Flex justify="center" align="center" height="100%">
					<WarningIcon />
					<Text trim="both" ml="2" weight="light">
						{error.message}
					</Text>
				</Flex>
			</ErrorCell>
		</ErrorRow>
	);
};

const ErrorRow = styled(Table.Row)<{ $hasError: boolean }>`
	height: ${({ $hasError }) => ($hasError ? '35px' : '0px')};
	visibility: ${({ $hasError }) => ($hasError ? 'visible' : 'collapse')};
`;

const ErrorCell = styled(Table.Cell)<{ $hasError: boolean }>`
	background-color: var(--tomato-4);
	border: ${({ $hasError }) =>
		$hasError ? '1px solid var(--tomato-7)' : '0px solid transparent'};
	transition: border 250ms ease-in;
`;
