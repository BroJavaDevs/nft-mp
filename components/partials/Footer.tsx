"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IconButton from '../client/IconButton'


export default function Footer() {
  
  return (
    <footer className='dark:bg-[#121212] pt-[130px] px-[90px]'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 mb-14'>
        <div className='flex flex-col gap-y-5'>
          <h1 className='font-semibold mb-1'>Resource</h1>
          <Link href='/' className='hover:underline'>All Guides</Link>
          <Link href='/' className='hover:underline'>Getting Started</Link>
          <Link href='/' className='hover:underline'>Blog</Link>
          <Link href='/' className='hover:underline'>Community standards</Link>
          <Link href='/' className='hover:underline'>Taxes</Link>
        </div>
        <div className='flex flex-col gap-y-5'>
          <h1 className='font-semibold mb-1'>Marketplace</h1>
          <Link href='/' className='hover:underline'>Art</Link>
          <Link href='/' className='hover:underline'>Gaming</Link>
          <Link href='/' className='hover:underline'>Photography</Link>
          <Link href='/' className='hover:underline'>PFPs</Link>
        </div>
        <div className='flex flex-col gap-y-5'>
          <h1 className='font-semibold mb-1'>Community</h1>
          <Link href='/' className='hover:underline'>What is NFT?</Link>
          <Link href='/' className='hover:underline'>How to buy an NFT</Link>
          <Link href='/' className='hover:underline'>How to sell an NFT using Jars</Link>
          <Link href='/' className='hover:underline'>What is a crypto wallet?</Link>
          <Link href='/' className='hover:underline'>What is cryptocurrency?</Link>
          <Link href='/' className='hover:underline'>What are blockchain gas fees?</Link>
          <Link href='/' className='hover:underline'>What is a blockchain?</Link>
          <Link href='/' className='hover:underline'>What is web3?</Link>
        </div>
        <div className='flex flex-col gap-y-5'>
          <h1 className='font-semibold mb-1'>Resource</h1>
          <Link href='/' className='hover:underline'>All Guides</Link>
          <Link href='/' className='hover:underline'>Getting Started</Link>
          <Link href='/' className='hover:underline'>Blog</Link>
          <Link href='/' className='hover:underline'>Community standards</Link>
          <Link href='/' className='hover:underline'>Taxes</Link>
        </div>
      </div>
      
      <div>
        <h1 className='text-2xl font-semibold mb-3'>Join the Community</h1>
        <IconButton />
      </div>
    </footer>
  )
}
