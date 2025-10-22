# Gasless Counter dApp with Paymaster

A decentralized application demonstrating gasless transactions on Base Sepolia using Coinbase Paymaster. This dApp allows users to interact with a simple Counter smart contract without needing to pay gas fees, as all transactions are sponsored by the paymaster.

## 🚀 Features

- **Gasless Transactions**: All contract interactions are sponsored by Coinbase Paymaster
- **Simple Counter Contract**: Increment, decrement, and set custom values
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Wallet Integration**: Seamless wallet connection using OnchainKit
- **Transaction Tracking**: Real-time transaction status and BaseScan integration

## 🏗️ Architecture

### Smart Contract
- **Counter.sol**: A simple Solidity contract with basic counter functionality
  - `increment()`: Increases the counter by 1
  - `decrement()`: Decreases the counter by 1 (with underflow protection)
  - `setNumber(uint256)`: Sets a custom value
  - `getNumber()`: Returns the current value

### Frontend
- **Next.js 15**: React framework with App Router
- **OnchainKit**: Coinbase's Web3 toolkit for wallet management
- **Wagmi**: React hooks for Ethereum interactions
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development

### Paymaster Integration
- **Coinbase Paymaster**: Sponsors gas fees for user transactions
- **Base Sepolia**: Testnet for deployment and testing

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MetaMask or compatible wallet
- Coinbase Cloud account with Paymaster configured
- ETH on Base Sepolia (optional, as transactions are sponsored)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/paymaster.git
   cd paymaster
   ```

2. **Install dependencies**
   ```bash
   # Install Foundry dependencies
   forge install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Create frontend/.env file
   cp frontend/.env.example frontend/.env
   ```
   
   Update `frontend/.env` with your configuration:
   ```env
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
   NEXT_PUBLIC_PAYMASTER_POLICY_ID=your_policy_id
   NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
   ```

## 🚀 Getting Started

### 1. Deploy the Smart Contract

```bash
# Deploy to Base Sepolia
forge script script/Counter.s.sol:CounterScript --rpc-url https://sepolia.base.org --private-key YOUR_PRIVATE_KEY --broadcast
```

Note the deployed contract address and update it in `frontend/app/counterABI.ts`.

### 2. Run the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to interact with the dApp.

### 3. Configure Paymaster

1. Log into your Coinbase Cloud account
2. Navigate to OnchainKit → Paymaster
3. Create a new policy or use an existing one
4. Whitelist your deployed contract address
5. Update your `.env` file with the API key and policy ID

## 🎯 How to Use

1. **Connect Wallet**: Click the wallet button in the top-right corner
2. **Switch Network**: Ensure you're on Base Sepolia (the app will prompt you if not)
3. **Interact with Counter**:
   - Use the "+" button to increment
   - Use the "−" button to decrement
   - Enter a custom value and click "Set"
4. **Verify Gasless Transactions**:
   - Your ETH balance should remain unchanged
   - Click "View on BaseScan" to see transaction details
   - Look for "Paymaster" indicators on BaseScan

## 🧪 Testing

### Smart Contract Tests

```bash
forge test
```

### Frontend

The frontend includes comprehensive state management and error handling. Test the paymaster functionality by:

1. Using a wallet with 0 ETH
2. Performing transactions - they should succeed without gas fees
3. Checking BaseScan for paymaster sponsorship

## 📁 Project Structure

```
├── src/                    # Smart contracts
│   └── Counter.sol         # Main counter contract
├── script/                 # Deployment scripts
│   └── Counter.s.sol       # Foundry deployment script
├── test/                   # Contract tests
│   └── Counter.t.sol       # Counter contract tests
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── Counter.tsx     # Main counter component
│   │   ├── page.tsx        # Home page
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── foundry.toml           # Foundry configuration
└── README.md              # This file
```

## 🔧 Configuration

### Paymaster Policy

Configure your paymaster policy in Coinbase Cloud:

1. **Sponsorship**: Set to sponsor all transactions for your contract
2. **Limits**: Configure daily/monthly limits as needed
3. **Whitelist**: Add your contract address to the whitelist

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | Coinbase OnchainKit API key | Yes |
| `NEXT_PUBLIC_PAYMASTER_POLICY_ID` | Paymaster policy ID | Yes |
| `NEXT_PUBLIC_RPC_URL` | Base Sepolia RPC URL | Yes |

## 🐛 Troubleshooting

### Common Issues

1. **"Paymaster service not configured properly"**
   - Verify your API key and policy ID in `.env`
   - Check that your contract is whitelisted
   - Restart the development server

2. **Transactions failing with gas errors**
   - Ensure your paymaster policy is active
   - Check if you've exceeded policy limits
   - Verify contract address is correct

3. **Wallet connection issues**
   - Ensure MetaMask is unlocked
   - Check that you're on Base Sepolia network
   - Try refreshing the page

### Debug Mode

The frontend includes comprehensive logging. Open browser dev tools to see:
- Transaction lifecycle events
- Paymaster API calls
- Network and configuration details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Coinbase OnchainKit Documentation](https://docs.coinbase.com/onchainkit)
- [Base Sepolia Faucet](https://sepoliafaucet.com/)
- [BaseScan Explorer](https://sepolia.basescan.org/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🙏 Acknowledgments

- [Coinbase](https://coinbase.com/) for OnchainKit and Paymaster
- [Base](https://base.org/) for the L2 network
- [Foundry](https://getfoundry.sh/) for the development framework
- [Wagmi](https://wagmi.sh/) for React hooks
