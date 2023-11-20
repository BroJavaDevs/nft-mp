"use client"

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  bloctoWallet,
  phantomWallet,
  safeWallet
} from "@thirdweb-dev/react";
import { Sepolia } from '@thirdweb-dev/chains'

type Props = {
  children: React.ReactNode
}

export default function ThirdwebProviderLayout({ children } : Props) {
  return (
    <ThirdwebProvider 
      activeChain={Sepolia}
      supportedChains={[Sepolia]} 
      clientId={process.env.THIRDWEB_CLIENT_ID}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        trustWallet(),
        bloctoWallet(),
        phantomWallet(),
        safeWallet()
      ]}
    >
      {children}
    </ThirdwebProvider>
  )
}