import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='w-full h-[65px] flex fixed z-50 top-0 left-0 backdrop-blur-lg bg-opacity-40 shadow-sm'>
      <div className='w-full 1300:w-[1232px] h-full flex flex-row items-center justify-between 1140:justify-around 1300:justify-between m-auto px-[10px] 400:px-[20px] 500:px-[40px] 1140:p-0'>
        <Link href='/'>
          <Image
            src="/assets/logo-transparent.png"
            alt="Vercel Logo"
            className="dark:invert"
            width={35}
            height={35}
            priority
          />
          <h1>Jars</h1>
        </Link>
      </div>
    </nav>
  )
}
