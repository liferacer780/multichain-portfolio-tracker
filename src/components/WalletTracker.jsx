import React, { useState } from 'react'
import useWalletStore from '../stores/walletStore'
import { ethers } from 'ethers'

function WalletTracker() {
  const { addWallet, wallets, removeWallet } = useWalletStore()
  const [newWallet, setNewWallet] = useState({
    address: '',
    chain: 'ethereum'
  })
  const [error, setError] = useState(null)

  const validateAddress = (address, chain) => {
    switch (chain) {
      case 'ethereum':
        return ethers.utils.isAddress(address)
      case 'solana':
        // TODO: Implement Solana address validation
        return true
      case 'bsc':
        return ethers.utils.isAddress(address)
      default:
        return false
    }
  }

  const handleAddWallet = async () => {
    setError(null)
    const { address, chain } = newWallet

    if (!address) {
      setError('Please enter a wallet address')
      return
    }

    if (!validateAddress(address, chain)) {
      setError('Invalid wallet address')
      return
    }

    try {
      await addWallet(address, chain)
      setNewWallet({ address: '', chain: 'ethereum' })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wallet Tracker</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex space-x-4 mb-4">
          <input 
            type="text" 
            placeholder="Wallet Address" 
            className="bg-gray-700 text-white p-2 rounded flex-grow"
            value={newWallet.address}
            onChange={(e) => setNewWallet({...newWallet, address: e.target.value})}
          />
          <select 
            className="bg-gray-700 text-white p-2 rounded"
            value={newWallet.chain}
            onChange={(e) => setNewWallet({...newWallet, chain: e.target.value})}
          >
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
            <option value="bsc">Binance Smart Chain</option>
          </select>
          <button 
            onClick={handleAddWallet}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Wallet
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Connected Wallets</h2>
        {wallets.length === 0 ? (
          <p className="text-gray-400">No wallets added yet</p>
        ) : (
          <div className="space-y-4">
            {wallets.map(wallet => (
              <div 
                key={wallet.address} 
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold truncate max-w-md">
                    {wallet.address}
                  </p>
                  <p className="text-sm text-gray-400">
                    {wallet.chain.toUpperCase()} | ${(wallet.balance || 0).toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => removeWallet(wallet.address)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletTracker