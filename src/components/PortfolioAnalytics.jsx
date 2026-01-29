import React from 'react'
import { Pie, Line } from 'react-chartjs-2'
import useWalletStore from '../stores/walletStore'
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title 
} from 'chart.js'

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title
)

function PortfolioAnalytics() {
  const { wallets, totalBalance } = useWalletStore()

  const portfolioCompositionData = {
    labels: wallets.map(w => w.chain),
    datasets: [{
      data: wallets.map(w => w.balance || 0),
      backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6']
    }]
  }

  // Simulating historical balance trend (this would typically come from historical data)
  const historicalBalanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [totalBalance * 0.8, totalBalance * 0.9, totalBalance, totalBalance * 1.1, totalBalance * 1.2, totalBalance * 1.3],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
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
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Historical Balance Trend</h2>
          <Line 
            data={historicalBalanceData} 
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `$${value}`
                  }
                }
              }
            }} 
          />
        </div>
      </div>
      <div className="mt-6 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Portfolio Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wallets.map(wallet => (
            <div key={wallet.address} className="bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold mb-2">
                {wallet.chain.toUpperCase()} Wallet
              </div>
              <div className="truncate mb-1">
                <span className="text-gray-400">Address:</span> {wallet.address}
              </div>
              <div className="text-2xl font-bold text-green-500">
                ${(wallet.balance || 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfolioAnalytics