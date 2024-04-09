import styled from 'styled-components';

export const StyledMenu = styled.menu<{ $darkText?: boolean }>`
	padding-inline-start: 0;
	margin: 0;
	padding: 0;

	a {
		color: ${({ $darkText }) => ($darkText ? 'black' : 'inherit')};
		text-decoration: none;
	}

	li {
		list-style: none;
		cursor: pointer;
		display: flex;
		align-items: center;

		margin: 5px 5px;
		margin-right: 15px;

		:hover {
			filter: var(--hover-light-3);
		}

		svg {
			margin-right: 5px;
		}

		${({ theme: t }) =>
			t.mx.mobile(`
            font-size: 1.2rem;
    `)}
	}
`;
