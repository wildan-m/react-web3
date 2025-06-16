import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'
import { http } from 'viem'
import App from './App'
import './index.css'

// Check if MetaMask is installed
const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum?.isMetaMask

const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected({
      target: 'metaMask',
      shimDisconnect: true,
    }),
    walletConnect({
      projectId: 'demo-project-id', // Replace with your WalletConnect project ID
      metadata: {
        name: 'React Web3 App',
        description: 'React Web3 App with multiple wallet options',
        url: 'http://localhost:5173',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    }),
    coinbaseWallet({
      appName: 'React Web3 App',
      appLogoUrl: 'https://avatars.githubusercontent.com/u/37784886'
    })
  ],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY || 'demo'}`),
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App isMetaMaskInstalled={isMetaMaskInstalled} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
) 