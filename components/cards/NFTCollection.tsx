import { sdk } from '@/api/thirdweb'
import Image from 'next/image'
import React from 'react'

type Props = {
  name: string
  imageUrl: string
}

export default function NFTCollection({ name, imageUrl} : Props) {
  return (
    <div className='w-min-[300px] w-max-[300px] bg-[#0A0A0A] rounded-2xl'>
      <Image
        className='rounded-t-2xl'
        src={imageUrl} width={300} height={280} sizes='100vw' 
        style={{ 
          width: '100%', 
          height: '260px'
        }} 
        alt=''/>
      <div className='flex flex-col px-4 py-3'>

        <h1 className='font-bold'>{name}</h1>

        {/* <p>Floor</p>
        <p>Total Volume</p> */}
      </div>
    </div>
  )
}
