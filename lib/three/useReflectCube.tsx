"use client"

import React, { useEffect, useRef } from 'react'
//import '@/lib/three/Jars'

const ReflectCube = () => {
  // let app;
  // useEffect(() => {
    

  //   return () => {
  //     app = null;
  //   }
  // }, []);

  return (
    <div className='absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 z-[2]'>
      <canvas id='canvasJars'></canvas>
    </div>
  )
  
}

export default ReflectCube;