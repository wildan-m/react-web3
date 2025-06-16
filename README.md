# React Web3 App 🚀

A modern, user-friendly React Web3 application that **works without requiring wallet installation**. Built with Vite, TypeScript, Wagmi, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.2-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)
![Wagmi](https://img.shields.io/badge/Wagmi-2.5-green.svg)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF.svg)

## ✨ Key Features

### 🎯 **Universal Access**
- **🚀 Demo Mode**: Try the full app without installing any wallet
- **💼 Multiple Wallet Support**: MetaMask, Coinbase Wallet, Rabby, Trust Wallet
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🌙 Dark Mode**: Automatic dark/light theme support

### 🔐 **Smart Wallet Integration**
- **🕵️ Auto-Detection**: Automatically detects installed wallets
- **⚡ Real-time Status**: Live connection status and feedback
- **🔄 Graceful Fallbacks**: Works even when no wallets are installed
- **🛡️ Secure**: Non-custodial, your keys remain yours

### 🎨 **Modern UI/UX**
- **✨ Beautiful Interface**: Clean, professional design
- **📊 Interactive Dashboard**: Mock wallet features and transaction history
- **🔍 Developer Tools**: Built-in debug information panel
- **⚠️ Smart Errors**: Helpful error messages and guidance

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd react-web3
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**
```bash
# Create .env file
echo "VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here" > .env
```

4. **Start development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser:**
Navigate to [http://localhost:5173](http://localhost:5173)

## 🎮 How to Use

### Option 1: Demo Mode (No Wallet Required) 🚀
1. Click **"🚀 Try Demo Mode"**
2. Explore all features with simulated data
3. Perfect for testing and demonstrations

### Option 2: Connect Real Wallet 💼
1. Install a supported wallet (MetaMask, Coinbase Wallet, etc.)
2. Click **"Connect Wallet"**
3. Choose your wallet from the list
4. Approve the connection

### Supported Wallets
- 🦊 **[MetaMask](https://metamask.io/)** - Most popular Ethereum wallet
- 🔵 **[Coinbase Wallet](https://www.coinbase.com/wallet)** - User-friendly option
- 🐰 **[Rabby](https://rabby.io/)** - Advanced features for power users
- 🛡️ **[Trust Wallet](https://trustwallet.com/)** - Mobile-first wallet

## 🏗️ Project Structure

```
react-web3/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point & Wagmi config
│   ├── index.css                  # Global styles with Tailwind
│   ├── hooks/
│   │   └── useWalletDetection.ts  # Custom wallet detection hook
│   └── vite-env.d.ts             # Vite type definitions
├── public/                        # Static assets
├── .env                          # Environment variables
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.js            # PostCSS configuration
```

## 🛠️ Technical Stack

### Core Technologies
- **⚛️ React 18** - Modern React with hooks and concurrent features
- **🔷 TypeScript** - Type-safe development
- **⚡ Vite** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS** - Utility-first CSS framework

### Web3 Integration
- **🔗 Wagmi** - Modern React hooks for Ethereum
- **⚡ Viem** - TypeScript interface for Ethereum
- **🔌 Multiple Connectors** - Support for various wallet types
- **🌐 Alchemy** - Reliable Ethereum node provider

### Development Tools
- **🔍 ESLint** - Code linting and formatting
- **📝 TypeScript** - Static type checking
- **🔄 Hot Reload** - Instant development feedback

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Required: Alchemy API key for Ethereum connection
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here

# Optional: WalletConnect Project ID (for WalletConnect support)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### Getting API Keys
- **Alchemy**: Sign up at [alchemy.com](https://www.alchemy.com/) for free
- **WalletConnect**: Create project at [cloud.walletconnect.com](https://cloud.walletconnect.com/)

## 🔧 Customization

### Adding New Wallets
Add new connectors in `src/main.tsx`:
```typescript
import { newWalletConnector } from 'new-wallet-package'

const config = createConfig({
  connectors: [
    injected(),
    newWalletConnector({ /* config */ }),
    // ...existing connectors
  ],
  // ...rest of config
})
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component styles use Tailwind utility classes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Wagmi](https://wagmi.sh/) for excellent React Web3 hooks
- [Viem](https://viem.sh/) for TypeScript Ethereum interface
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for blazing-fast development experience

---

**Made with ❤️ for the Web3 community** 