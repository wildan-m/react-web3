import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

function App() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: injected(),
  })
  const { disconnect } = useDisconnect()

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
            <button
              onClick={() => connect()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Connect Wallet
            </button>
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
        </div>
      </div>
    </div>
  )
}

export default App 