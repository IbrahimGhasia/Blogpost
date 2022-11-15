import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
	[chain.polygon, chain.polygonMumbai],
	[publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'My Blogpost App',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Blogpost</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<WagmiConfig client={wagmiClient}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						/** Put your mantine theme override here */
						colorScheme: 'dark',
					}}
				>
					<RainbowKitProvider chains={chains}>
						<NotificationsProvider>
							<Component {...pageProps} />
						</NotificationsProvider>
					</RainbowKitProvider>
				</MantineProvider>
			</WagmiConfig>
		</>
	);
}

export default MyApp;
