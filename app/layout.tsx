import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThirdwebProviderLayout from '@/components/providers/ThirdwebProviderLayout'
import Navbar from '@/components/partials/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jars: Explore, Trade & Collect Unique Digital Assets | NFT Marketplace',
  description: 'Discover, trade, and collect unique digital assets at Jars - your premier NFT marketplace. Explore an exclusive range of digital collectibles, artworks, and more. Join us to elevate your digital asset journey today!',
  keywords: ["Crypto Market", "NFT marketplace", "digital collectibles", "unique artworks", "digital asset trading", "exclusive NFTs", "collectible tokens"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ` bg-gradient-to-br from-gray-200 to-purple-200 `}>
        <ThirdwebProviderLayout>
          <Navbar />
          {children}
        </ThirdwebProviderLayout>
      </body>
    </html>
  )
}
