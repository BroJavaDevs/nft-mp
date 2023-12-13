"use client"
import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'


export default function IconButton() {
  return (
    <div className='w-[50px] h-[50px] bg-[#d9d9d9] dark:text-[#444444] text-2xl rounded-[10px] flex items-center justify-center'>
      <Link href='/'>
        <FaFacebookF />
      </Link>
    </div>
  )
}
