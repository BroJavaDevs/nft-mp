"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useRef, useState } from "react";
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
import { Button } from "../ui/button";
import Menubar from "../main/Menubar";
import AuthDialog from "../main/dialogs/AuthDialog";

const style = {
  headerItems: `flex items-center justify-end`,
  headerItem: `px-4 font-bold hover:text-zinc-500 cursor-pointer`,
  headerIcon: `text-3xl font-black px-4 hover:text-zinc-500 cursor-pointer`,
};

export default function Navbar() {
  return (
    <nav className="w-full h-[65px] px-[1.2rem] py-[0.8rem] flex justify-between fixed z-50 top-0 left-0 bg-gray-900 bg-opacity-80 backdrop-blur-lg border-b-2 border-gray-700 shadow-sm">
      <div className='flex flex-row'>
        <Link href="/" className="flex flex-row items-center">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/assets/logo-transparent.png"
              alt="Vercel Logo"
              className="dark:invert"
              width={35}
              height={35}
              priority
            />
            <div className="ml-[0.5rem] font-semibold text-2xl">Jars</div>
          </div>
        </Link>

        <div className="flex mx-[0.8rem] lg:w-[340px] dark:bg-black border items-center rounded-full">
          <div className="dark:text-[#8a939b] mx-3 font-bold text-lg">
            <AiOutlineSearch />
          </div>
          <input
            className="h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 placeholder:text-[#8a939b]"
            placeholder="Search items, collections, and accounts"
          />
        </div>
      </div>

      <div className={style.headerItems + ` hidden lg:flex`}>
        <Link href="/news">
          <div className={style.headerItem}>News</div>
        </Link>
        <Link href="/collection">
          <div className={style.headerItem}>Collections</div>
        </Link>
        <Link href="/trade">
          <div className={style.headerItem}>Trade</div>
        </Link>
        <Link href="/coin">
          <div className={style.headerItem}>Coin Analytics</div>
        </Link>
        <Link href="/learn">
          <div className={style.headerItem}>Learn</div>
        </Link>
      </div>

      <div className="flex items-center justify-end">
        <div className={style.headerIcon + ` hidden lg:flex`}>
          <Link href={`/me`}>
            <CgProfile />
          </Link>
        </div>
        <div className={style.headerItem}>
          <AuthDialog />
          {/* <ConnectWallet 
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
              detailsBtn={() => <h1>sdawd</h1>}
              //welcomeScreen={() => <></>}
              modalTitleIconUrl='/assets/logo-transparent.png'
              /> */}
        </div>
        <div className="text-zinc-700 text-3xl font-black hover:text-zinc-500 cursor-pointer flex lg:hidden">
          <Menubar />
        </div>
      </div>
    </nav>
  );
}
