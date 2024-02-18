import { useGetAuthStatusQuery } from '../../queries/userQueries';
import { Header } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react';
import { User } from '../../types/userTypes';
import AccountMenu from '../../components/Account/AccountMenu/AccountMenu';
import styled from 'styled-components';

export const UserContext = createContext<{ user: User | null }>({ user: null });

const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const user = data?.user || null;

	return (
		<Container>
			<Header as="h3" textAlign="center">
				Account Info
			</Header>

			<AccountMenu />

			<UserContext.Provider value={{ user }}>
				<Outlet />
			</UserContext.Provider>
		</Container>
	);
};

export default Account;

const Container = styled.div`
	padding: 0 5vw;
`;
