import React from 'react'
import { Pie } from 'react-chartjs-2'
import useWalletStore from '../stores/walletStore'

function Dashboard() {
  const { wallets, totalBalance } = useWalletStore()

  const portfolioCompositionData = {
    labels: wallets.map(w => w.chain),
    datasets: [{
      data: wallets.map(w => w.balance || 0),
      backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6']
    }]
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Total Balance</h2>
          <p className="text-3xl font-bold text-green-500">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4">Portfolio Composition</h2>
          <Pie 
            data={portfolioCompositionData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              }
            }} 
          />
        </div>
      </div>
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wallets.map(wallet => (
            <div key={wallet.address} className="bg-gray-700 p-4 rounded-lg">
              <div className="truncate mb-2">
                <span className="font-semibold">Address:</span> {wallet.address}
              </div>
              <div>
                <span className="font-semibold">Chain:</span> {wallet.chain.toUpperCase()}
              </div>
              <div>
                <span className="font-semibold">Balance:</span> ${(wallet.balance || 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard