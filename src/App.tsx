import { useAccount, useConnect, useDisconnect, useConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState, useEffect } from 'react'

interface AppProps {
  isMetaMaskInstalled: boolean
}

function App({ isMetaMaskInstalled }: AppProps) {
  const { address, isConnected, status } = useAccount()
  const { connect, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const config = useConfig()
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    // Debug information
    const info = {
      config: {
        chains: config?.chains?.map(chain => ({
          id: chain.id,
          name: chain.name,
        })),
        connectorNames: config?.connectors?.map(connector => connector.name),
      },
      connection: {
        status,
        isConnected,
        address,
      },
      error: connectError ? {
        name: connectError.name,
        message: connectError.message,
      } : null,
      metaMask: {
        isInstalled: isMetaMaskInstalled,
      },
    }
    setDebugInfo(JSON.stringify(info, null, 2))
  }, [config, status, isConnected, address, connectError, isMetaMaskInstalled])

  const handleConnect = async () => {
    try {
      setError(null)
      if (!isMetaMaskInstalled) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.')
      }
      console.log('Attempting to connect...')
      const connector = injected({
        target: 'metaMask',
      })
      console.log('Connector created:', connector)
      await connect({
        connector,
      })
      console.log('Connect call completed')
    } catch (err) {
      console.error('Connection error:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">React Web3 App</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Connect your wallet to get started
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              {!isMetaMaskInstalled ? (
                <div className="text-center">
                  <p className="text-red-500 mb-4">MetaMask is not installed</p>
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    Install MetaMask
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Connect Wallet
                </button>
              )}
              {(error || connectError) && (
                <div className="text-red-500 text-sm text-center">
                  {error || connectError?.message}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">Connected Address:</p>
                <p className="font-mono text-sm break-all">{address}</p>
              </div>
              <button
                onClick={() => disconnect()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* Debug Information */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
            <pre className="text-xs overflow-auto max-h-60">
              {debugInfo}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 