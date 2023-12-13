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
import { Ethereum, Sepolia } from '@thirdweb-dev/chains'

type Props = {
  children: React.ReactNode
}

export default function ThirdwebProviderLayout({ children } : Props) {
  return (
    <ThirdwebProvider 
      activeChain={Sepolia}
      supportedChains={[Sepolia]}
      clientId='93efbca6989677b9c2efecc0a8010f7c'
      secretKey='ZZaSvS4BNIFCEWPPj5hRV9QUuwFiGuMPTAPjwXyg2Eq0_s4YT-d01LawS0V-j8_-ziqrA-yb13SUymEAlp8fFw'
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