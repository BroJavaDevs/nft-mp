"use client"

import React, { useEffect } from 'react'
import { useContract } from '@thirdweb-dev/react';
export default function Contract() {
  const { contract, isLoading, isError } = useContract("0x69b05D8ed116Bb160B8a268a4315D2767123eFA1");
  
  useEffect(() => { 
    console.log(contract)
  }, [])

  return (
    <div>

    </div>
  )
}
