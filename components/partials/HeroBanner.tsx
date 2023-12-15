"use client"

import Image from 'next/image'

export default function HeroBanner() {
  return (
    <div className='flex flex-col'>
      <Image src="/assets/hero-icon.svg" width={1440} height={500} sizes='100vw' style={{ width: '100%', height: 'auto'}} alt='' />
    </div>
  )
}
