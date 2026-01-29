# CryptoTracker Pro

A comprehensive cryptocurrency wallet tracking application with real-time portfolio insights across multiple blockchain networks.

## Features

- Multi-chain wallet tracking (Ethereum, Solana, BSC)
- Real-time balance monitoring
- Transaction history
- Portfolio analytics with interactive charts

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel deploy --prod
```

## Environment Variables

- `VITE_BLOCKCHAIN_API_KEY`: API key for blockchain data retrieval

## Technologies

- Vite
- React 19
- Chart.js
- Tailwind CSS
- Zustand (State Management)

## Theme

Dark Finance theme with electric green accents, deep blue backgrounds, and charcoal gray surfaces.

## Roadmap

- [ ] Complete Solana wallet integration
- [ ] Add more blockchain networks
- [ ] Implement real-time token price tracking
- [ ] Enhanced portfolio analytics