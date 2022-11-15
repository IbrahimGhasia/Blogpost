import { AppShell, Navbar, Header, Group } from '@mantine/core';
import { SimpleNavbar } from './SimpleNavbar';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Layout(props) {
	return (
		<AppShell
			padding='md'
			// navbar={<Navbar width={{ base: 300 }} height={500} p='xs'></Navbar>}
			navbar={<SimpleNavbar />}
			header={
				<Header height={70} p='md'>
					<Group position='right' mr={20}>
						<ConnectButton />
					</Group>
				</Header>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			{props.children}
		</AppShell>
	);
}
