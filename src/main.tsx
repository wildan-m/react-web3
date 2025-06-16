import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider, createConfig } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'
import { http } from 'viem'
import App from './App'
import './index.css'

// Check if MetaMask is installed
const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum?.isMetaMask

// Create a simpler config first to test basic functionality
const config = createConfig({
  chains: [sepolia, mainnet],
  connectors: [
    injected(), // This will auto-detect available injected wallets
  ],
  transports: {
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
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