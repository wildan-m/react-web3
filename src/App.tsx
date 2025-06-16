import { useAccount, useConnect, useDisconnect, useConfig } from 'wagmi'
import { useState, useEffect } from 'react'
import { useWalletDetection } from './hooks/useWalletDetection'

// Mock wallet data for demo mode
const MOCK_WALLET_DATA = {
  address: '0x742d35Cc6634C0532925a3b8D5c3c3Bd3c6a9c3d',
  balance: '1.5 ETH',
  network: 'Ethereum Mainnet',
  transactions: [
    { hash: '0x1a2b3c...', type: 'Send', amount: '0.1 ETH', status: 'Confirmed' },
    { hash: '0x4d5e6f...', type: 'Receive', amount: '0.5 ETH', status: 'Confirmed' },
    { hash: '0x7g8h9i...', type: 'Swap', amount: '100 USDC', status: 'Pending' },
  ]
}

function App() {
  const { address, isConnected, status } = useAccount()
  const { connect, connectors, error: connectError, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const config = useConfig()
  const walletInfo = useWalletDetection()
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')
  const [demoMode, setDemoMode] = useState(false)
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  useEffect(() => {
    // Debug information
    const info = {
      config: {
        chains: config?.chains?.map(chain => ({
          id: chain.id,
          name: chain.name,
        })),
        connectorNames: config?.connectors?.map(connector => ({
          name: connector.name,
          ready: connector.ready,
          id: connector.id
        })),
      },
      connection: {
        status,
        isConnected: isConnected || demoMode,
        address: address || (demoMode ? MOCK_WALLET_DATA.address : null),
        isPending,
      },
      error: connectError ? {
        name: connectError.name,
        message: connectError.message,
      } : null,
      walletDetection: walletInfo,
      demoMode,
    }
    setDebugInfo(JSON.stringify(info, null, 2))
  }, [config, status, isConnected, address, connectError, walletInfo, demoMode, isPending])

  const handleConnect = async (connector: any) => {
    try {
      setError(null)
      console.log('Attempting to connect with:', connector.name)
      await connect({ connector })
      setShowWalletOptions(false)
      console.log('Connect call completed')
    } catch (err) {
      console.error('Connection error:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    }
  }

  const handleDemoMode = () => {
    setDemoMode(true)
    setShowWalletOptions(false)
    setError(null)
  }

  const handleDisconnect = () => {
    if (demoMode) {
      setDemoMode(false)
    } else {
      disconnect()
    }
    setShowWalletOptions(false)
  }

  const currentAddress = address || (demoMode ? MOCK_WALLET_DATA.address : null)
  const isWalletConnected = isConnected || demoMode

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              React Web3 App
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Connect your wallet to get started, or try our demo mode
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wallet Connection Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Wallet Connection
              </h2>
              
              {!isWalletConnected ? (
                <div className="space-y-4">
                  {!showWalletOptions ? (
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowWalletOptions(true)}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        Connect Wallet
                      </button>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">or</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleDemoMode}
                        className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        🚀 Try Demo Mode
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowWalletOptions(false)}
                        className="mb-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        ← Back
                      </button>
                      
                      <div className="grid gap-3">
                        {connectors.map((connector) => {
                          const isReady = connector.ready || connector.name === 'Injected'
                          const isAvailable = walletInfo.hasAnyWallet || connector.name === 'Injected'
                          
                          return (
                            <button
                              key={connector.id}
                              onClick={() => handleConnect(connector)}
                              disabled={!isReady || !isAvailable || isPending}
                              className={`w-full flex items-center justify-between py-3 px-4 rounded-lg shadow-sm text-sm font-medium transition-colors ${
                                isReady && isAvailable && !isPending
                                  ? 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                  : 'text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed'
                              }`}
                            >
                              <span>
                                {connector.name}
                                {isPending && ' (Connecting...)'}
                              </span>
                              <span className="text-xs">
                                {!isReady && '(Not Ready)'}
                                {!isAvailable && '(Not Available)'}
                                {isReady && isAvailable && '✓'}
                              </span>
                            </button>
                          )
                        })}
                        
                        {walletInfo.availableWallets.length > 0 && (
                          <div className="mt-2 p-2 bg-green-50 dark:bg-green-900 rounded-lg">
                            <p className="text-xs text-green-700 dark:text-green-300">
                              Detected wallets: {walletInfo.availableWallets.join(', ')}
                            </p>
                          </div>
                        )}
                        
                        {!walletInfo.hasAnyWallet && (
                          <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                              No wallet detected. To connect a real wallet:
                            </p>
                            <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                              <li>• Install <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="underline">MetaMask</a></li>
                              <li>• Install <a href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer" className="underline">Coinbase Wallet</a></li>
                              <li>• Install <a href="https://rabby.io/" target="_blank" rel="noopener noreferrer" className="underline">Rabby</a></li>
                            </ul>
                          </div>
                        )}
                        
                        <button
                          onClick={handleDemoMode}
                          className="w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-green-700 dark:text-green-200 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                        >
                          🚀 Demo Mode (No Wallet Required)
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {(error || connectError) && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-300">
                        {error || connectError?.message}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {demoMode ? 'Demo Mode Active' : 'Wallet Connected'}
                      </span>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Disconnect
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Connected Address:</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                      {currentAddress}
                    </p>
                  </div>
                  
                  {demoMode && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Balance:</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {MOCK_WALLET_DATA.balance}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Network:</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {MOCK_WALLET_DATA.network}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Features Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                {isWalletConnected ? 'Wallet Features' : 'Available Features'}
              </h2>
              
              {isWalletConnected ? (
                <div className="space-y-4">
                  {demoMode && (
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        💡 You're in demo mode! All data shown is simulated and no real transactions will occur.
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="text-sm font-medium">Send</div>
                      </div>
                    </button>
                    
                    <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-center">
                        <div className="text-2xl mb-2">📥</div>
                        <div className="text-sm font-medium">Receive</div>
                      </div>
                    </button>
                    
                    <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🔄</div>
                        <div className="text-sm font-medium">Swap</div>
                      </div>
                    </button>
                    
                    <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-sm font-medium">Portfolio</div>
                      </div>
                    </button>
                  </div>
                  
                  {demoMode && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Recent Transactions</h3>
                      <div className="space-y-3">
                        {MOCK_WALLET_DATA.transactions.map((tx, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="text-lg">
                                {tx.type === 'Send' ? '📤' : tx.type === 'Receive' ? '📥' : '🔄'}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{tx.type}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{tx.hash}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{tx.amount}</p>
                              <p className={`text-xs ${tx.status === 'Confirmed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                {tx.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Get Started Today!
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">✅</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Multiple Wallet Support</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">MetaMask, WalletConnect, Coinbase Wallet</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">🚀</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Demo Mode Available</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Try the app without installing any wallet</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">🔒</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Secure & Private</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your keys, your crypto</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Debug Information */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-900 dark:text-white">
                Debug Information
                <span className="transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-60 whitespace-pre-wrap">
                  {debugInfo}
                </pre>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 