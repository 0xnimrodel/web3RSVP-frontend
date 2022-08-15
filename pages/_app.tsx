import Layout from '@components/UI/Layout'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { ThemeProvider} from 'next-themes'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ alchemyId }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'web3rsvp',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const customTheme = {
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: '#0284c7',
    accentColorForeground: 'white',
    actionButtonBorder: 'rgba(255, 255, 255, 0.04)',
    actionButtonBorderMobile: 'rgba(255, 255, 255, 0.08)',
    actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
    closeButton: 'rgba(224, 232, 255, 0.6)',
    closeButtonBackground: 'rgba(255, 255, 255, 0.08)',
    connectButtonBackground: '#1A1B1F',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground: 'linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))',
    connectButtonText: '#FFF',
    connectButtonTextError: '#FFF',
    connectionIndicator: '#30E000',
    error: '#FF494A',
    generalBorder: 'rgba(255, 255, 255, 0.08)',
    generalBorderDim: 'rgba(255, 255, 255, 0.04)',
    menuItemBackground: 'rgba(224, 232, 255, 0.1)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: 'rgb(15 23 42)',
    modalBorder: 'rgba(255, 255, 255, 0.08)',
    modalText: '#FFF',
    modalTextDim: 'rgba(224, 232, 255, 0.3)',
    modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
    profileAction: 'rgba(224, 232, 255, 0.1)',
    profileActionHover: 'rgba(224, 232, 255, 0.2)',
    profileForeground: 'rgba(224, 232, 255, 0.05)',
    selectedOptionBorder: 'rgba(224, 232, 255, 0.1)',
    standby: '#FFD641',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  radii: {
    actionButton: '6px',
    connectButton: '6px',
    menuButton: '6px',
    modal: '6px',
    modalMobile: '28px',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
};

export default function MyApp({ Component, pageProps }: any) {
  
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} coolMode theme={customTheme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </ApolloProvider>
    </ThemeProvider>
  )
}
