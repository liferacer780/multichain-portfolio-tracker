import React from 'react'
import useWalletStore from '../stores/walletStore'

function TransactionHistory() {
  const { wallets } = useWalletStore()

  const allTransactions = wallets.flatMap(wallet => 
    (wallet.transactions || []).map(tx => ({
      ...tx,
      walletAddress: wallet.address,
      chain: wallet.chain
    }))
  ).sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        {allTransactions.length === 0 ? (
          <p className="text-gray-400 text-center">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-2">Date</th>
                  <th className="px-2">Wallet</th>
                  <th className="px-2">Chain</th>
                  <th className="px-2">Amount</th>
                  <th className="px-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((tx, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-2">
                      {new Date(tx.timestamp * 1000).toLocaleString()}
                    </td>
                    <td className="px-2 truncate max-w-xs">
                      {tx.walletAddress.substring(0, 10)}...
                    </td>
                    <td className="px-2 uppercase">{tx.chain}</td>
                    <td className="px-2">
                      <span className={
                        parseFloat(tx.value) > 0 
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }>
                        {tx.value} ETH
                      </span>
                    </td>
                    <td className="px-2">
                      {parseFloat(tx.value) > 0 ? 'Receive' : 'Send'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory