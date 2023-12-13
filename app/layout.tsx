import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThirdwebProviderLayout from '@/components/providers/ThirdwebProviderLayout'
import Navbar from '@/components/partials/Navbar'
import Footer from '@/components/partials/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jars: Explore, Trade & Collect Unique Digital Assets | NFT Marketplace',
  description: 'Discover, trade, and collect unique digital assets at Jars - your premier NFT marketplace. Explore an exclusive range of digital collectibles, artworks, and more. Join us to elevate your digital asset journey today!',
  keywords: ["Crypto Market", "NFT marketplace", "digital collectibles", "unique artworks", "digital asset trading", "exclusive NFTs", "collectible tokens"]
}

type Props = {
  children: React.ReactNode,
}

export default function RootLayout({ children }: Props) {

  return (
    <html lang="en">
      <body className={inter.className + `overflow-hidden`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          <ThirdwebProviderLayout>
            <Navbar />
              {children}
            <Footer />
          </ThirdwebProviderLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
