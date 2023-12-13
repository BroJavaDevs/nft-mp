import { sdk } from '@/api/thirdweb'
import NFTCollection from '@/components/cards/NFTCollection'
import HeroBanner from '@/components/partials/HeroBanner'
import Image from 'next/image'
import { getCollections } from '@/api/opensea';

import Contract from '@/components/client/Contract';

export default async function Home() {
  const collections = await getCollections();

  return (
    <main className=''>
      <HeroBanner />
      
      <div className='px-4 py-10 md:px-16 lg:px-16'>
        <h1 className='text-2xl font-bold mb-6'>Popular Collections</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-14'>
          {collections.map((col: any, i: number) => (
            <NFTCollection key={i} name={col.name} imageUrl={col.image_url}/>
          ))}
        </div>
      </div>
      
      
    </main>
  )
}
