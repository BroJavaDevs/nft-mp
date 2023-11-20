"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import {
  ConnectWallet,
  lightTheme,
  useLogin,
  useContract,
  useContractMetadata,
  useNFT,
  useLogout,
  useUser,
  useAddress,
} from "@thirdweb-dev/react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile, CgMenu } from "react-icons/cg";

import { SIDENAV_ITEMS } from './constants';
import { SideNavItem, MenuItemWithSubMenuProps } from '@/lib/types';

const style = {
  headerItems: `flex items-center justify-end`,
  headerItem: `px-4 font-bold text-zinc-700 hover:text-zinc-500 cursor-pointer`,
  headerIcon: `text-zinc-700 text-3xl font-black px-4 hover:text-zinc-500 cursor-pointer`
}

export default function Navbar() {
  return (
    <nav className='w-full h-[65px] px-[1.2rem] py-[0.8rem] flex fixed z-50 top-0 left-0 backdrop-blur-lg bg-opacity-50 shadow-sm'>
        <Link href='/' className='flex flex-row items-center'>
          <div className='flex items-center cursor-pointer'>
            <Image
              src="/assets/logo-transparent.png"
              alt="Vercel Logo"
              className="dark:invert"
              width={35}
              height={35}
              priority />
            <div className='ml-[0.5rem] font-extrabold text-2xl'>Jars</div>
            <span className='ml-[0.8rem] text-2xl'>/</span>
          </div>
        </Link>

        <div className={style.headerItems + ` hidden lg:flex`}>
          <Link href="/collections">
            <div className={style.headerItem}>Collections</div>
          </Link>
          <Link href="/stats">
            <div className={style.headerItem}>Stats</div>
          </Link>
          <Link href="/resources">
            <div className={style.headerItem}>Resources</div>
          </Link>
          <Link href="/create">
            <div className={style.headerItem}>Create</div>
          </Link>
        </div>

        <div className='flex flex-1 mx-[0.8rem] w-max-[520px] border-zinc-300 border items-center bg-[#dfdfdf] rounded-[0.8rem] '>
          <div className='text-[#8a939b] mx-3 font-bold text-lg'>
            <AiOutlineSearch />
          </div>
          <input
            className='h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 placeholder:text-[#8a939b]'
            placeholder="Search items, collections, and accounts"
          />
        </div>

        <div className='flex items-center justify-end'>
          <div className={style.headerIcon + ` hidden lg:flex`}>
            <Link href={`/`}>
              <CgProfile />
            </Link>
          </div>
          <div className={style.headerItem}>
            <ConnectWallet 
              theme={
                lightTheme({
                  colors: {
                    primaryButtonBg: "#FFFFFF",
                    primaryButtonText: "#1a1523"
                  }
                })
              }
              hideTestnetFaucet
              switchToActiveChain
              //welcomeScreen={() => <></>}
              modalTitleIconUrl='/assets/logo-transparent.png'
              />
          </div>
          <div className='text-zinc-700 text-3xl font-black hover:text-zinc-500 cursor-pointer flex lg:hidden'>
              <CgMenu />
          </div>
        </div>
    </nav>
  )
}
