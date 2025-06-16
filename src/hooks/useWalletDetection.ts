import { useState, useEffect } from 'react'

interface WalletInfo {
  isMetaMask: boolean
  isCoinbaseWallet: boolean
  isRabby: boolean
  isTrust: boolean
  hasAnyWallet: boolean
  availableWallets: string[]
}

export function useWalletDetection(): WalletInfo {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    isMetaMask: false,
    isCoinbaseWallet: false,
    isRabby: false,
    isTrust: false,
    hasAnyWallet: false,
    availableWallets: []
  })

  useEffect(() => {
    const checkWallets = () => {
      if (typeof window === 'undefined') return

      const ethereum = window.ethereum
      const availableWallets: string[] = []

      // Check for MetaMask
      const isMetaMask = !!(ethereum && ethereum.isMetaMask && !ethereum.isBraveWallet)
      if (isMetaMask) availableWallets.push('MetaMask')

      // Check for Coinbase Wallet
      const isCoinbaseWallet = !!(ethereum && (ethereum.isCoinbaseWallet || ethereum.selectedProvider?.isCoinbaseWallet))
      if (isCoinbaseWallet) availableWallets.push('Coinbase Wallet')

      // Check for Rabby
      const isRabby = !!(ethereum && ethereum.isRabby)
      if (isRabby) availableWallets.push('Rabby')

      // Check for Trust Wallet
      const isTrust = !!(ethereum && ethereum.isTrust)
      if (isTrust) availableWallets.push('Trust Wallet')

      // Check if any wallet is available
      const hasAnyWallet = !!(ethereum)

      setWalletInfo({
        isMetaMask,
        isCoinbaseWallet,
        isRabby,
        isTrust,
        hasAnyWallet,
        availableWallets
      })
    }

    // Initial check
    checkWallets()

    // Listen for wallet installations
    const handleEthereumChange = () => {
      setTimeout(checkWallets, 100) // Small delay to ensure ethereum object is updated
    }

    window.addEventListener('ethereum#initialized', handleEthereumChange)
    
    // Also check periodically in case a wallet gets installed
    const interval = setInterval(checkWallets, 1000)

    return () => {
      window.removeEventListener('ethereum#initialized', handleEthereumChange)
      clearInterval(interval)
    }
  }, [])

  return walletInfo
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isCoinbaseWallet?: boolean
      isRabby?: boolean
      isTrust?: boolean
      isBraveWallet?: boolean
      selectedProvider?: {
        isCoinbaseWallet?: boolean
      }
      request?: (...args: any[]) => Promise<any>
    }
  }
}

export {}
