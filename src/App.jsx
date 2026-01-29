import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import WalletTracker from './components/WalletTracker'
import TransactionHistory from './components/TransactionHistory'
import PortfolioAnalytics from './components/PortfolioAnalytics'
import useWalletStore from './stores/walletStore'

function App() {
  const { wallets, refreshWallets } = useWalletStore()

  useEffect(() => {
    // Periodically refresh wallet data
    const intervalId = setInterval(refreshWallets, 60000) // Refresh every minute
    return () => clearInterval(intervalId)
  }, [refreshWallets])

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-green-500">CryptoTracker Pro</div>
            <div className="space-x-4">
              <Link to="/" className="hover:text-green-500">Dashboard</Link>
              <Link to="/wallet" className="hover:text-green-500">Wallets</Link>
              <Link to="/transactions" className="hover:text-green-500">Transactions</Link>
              <Link to="/analytics" className="hover:text-green-500">Analytics</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<WalletTracker />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/analytics" element={<PortfolioAnalytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App