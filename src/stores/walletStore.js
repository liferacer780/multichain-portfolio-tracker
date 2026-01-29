import { create } from 'zustand'
import { ethers } from 'ethers'

const useWalletStore = create((set, get) => ({
  wallets: [],
  totalBalance: 0,
  transactions: [],

  addWallet: async (address, chain) => {
    const { wallets } = get()
    
    // Prevent duplicate wallets
    if (wallets.some(w => w.address === address && w.chain === chain)) {
      return
    }

    try {
      // Fetch initial wallet data based on chain
      const walletData = await fetchWalletData(address, chain)
      
      const newWallet = {
        address,
        chain,
        ...walletData
      }

      set(state => ({
        wallets: [...state.wallets, newWallet],
        totalBalance: state.totalBalance + (newWallet.balance || 0)
      }))
    } catch (error) {
      console.error('Failed to add wallet:', error)
    }
  },

  removeWallet: (address) => {
    set(state => ({
      wallets: state.wallets.filter(w => w.address !== address),
      totalBalance: state.wallets
        .filter(w => w.address !== address)
        .reduce((sum, wallet) => sum + (wallet.balance || 0), 0)
    }))
  },

  refreshWallets: async () => {
    const { wallets } = get()
    const updatedWallets = await Promise.all(
      wallets.map(wallet => fetchWalletData(wallet.address, wallet.chain))
    )

    set({
      wallets: updatedWallets,
      totalBalance: updatedWallets.reduce((sum, wallet) => sum + (wallet.balance || 0), 0)
    })
  }
}))

// Chain-specific wallet data retrieval
async function fetchWalletData(address, chain) {
  switch (chain) {
    case 'ethereum':
      return fetchEthereumWalletData(address)
    case 'solana':
      return fetchSolanaWalletData(address)
    case 'bsc':
      return fetchBSCWalletData(address)
    default:
      throw new Error('Unsupported chain')
  }
}

// Ethereum wallet data retrieval (example implementation)
async function fetchEthereumWalletData(address) {
  const provider = new ethers.providers.EtherscanProvider()
  
  try {
    const balance = await provider.getBalance(address)
    const balanceInEth = ethers.utils.formatEther(balance)

    const transactions = await provider.getHistory(address, 0, 'latest')
    const formattedTransactions = transactions.map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: ethers.utils.formatEther(tx.value),
      timestamp: tx.timestamp
    }))

    return {
      balance: parseFloat(balanceInEth),
      tokens: [], // Placeholder for token balances
      transactions: formattedTransactions
    }
  } catch (error) {
    console.error('Ethereum wallet fetch error:', error)
    return { balance: 0, tokens: [], transactions: [] }
  }
}

// Placeholder for other blockchain data retrievals
function fetchSolanaWalletData(address) {
  // TODO: Implement Solana wallet data retrieval
  return { balance: 0, tokens: [], transactions: [] }
}

function fetchBSCWalletData(address) {
  // TODO: Implement BSC wallet data retrieval
  return { balance: 0, tokens: [], transactions: [] }
}

export default useWalletStore