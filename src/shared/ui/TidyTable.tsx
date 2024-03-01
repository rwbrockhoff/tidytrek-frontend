import { Table } from 'semantic-ui-react';
import styled, { css } from 'styled-components';
import { mobile } from '../mixins/mixins';

// Table Overrides for Semantic UI Table for Mobile Styles

// Optional: Semantic limits colSpan to 16, we override this by passing
// a percentage to td

const borderStyle = '1px solid rgba(34, 36, 38, 0.1)';

const TidyTable = styled(Table)<{ $tableCellWidth?: string }>`
	&&& {
		border: none;

		${({ $tableCellWidth }) =>
			$tableCellWidth &&
			css`
				td {
					width: ${$tableCellWidth};
				}
			`};

		${mobile(`
        th, td {
            padding: 1em 0.5em;
            position: relative;
        }
    
        tr, td {
            display: block;
            width: 100%;
        }

        thead, tfoot tr {
            display: flex;
        }
    
        tbody tr {
            border-top: ${borderStyle};
        }
    
        td {
            border-top: none;
            border-left: none;
        }
    
        tbody tr:not(:last-child) {
            padding: 0.25em 0;
        }
    
        tbody td {
            padding: 1em 0em;
            font-size: 1.2em;
            input {
                height: 40px;
            }
        }
    
         td:not(:last-child) {
            border-bottom: ${borderStyle};
        }
        `)}
	}
`;

export default TidyTable;
