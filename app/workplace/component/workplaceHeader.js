import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

function WorkplaceHeader({ fileName }) {
  return (
    <div className="py-4 px-16 flex items-center justify-between shadow-sm relative">
      {/* Logo à gauche */}
      <Image
        src="/notamind_row.png"
        alt="logo"
        width={150}
        height={50}
        priority
        style={{ height: 'auto' }}
      />

      {/* Titre centré absolument */}
      <p className='absolute left-1/2 transform -translate-x-1/2 text-2xl  text-stone-800'>
       PDF Title: &nbsp; 
      <span className=" text-2xl font-bold text-stone-800">
        {fileName}
      </span>
      </p>

      {/* Bouton utilisateur à droite */}
      <div className="transform scale-155">
        <UserButton />
      </div>
    </div>
  )
}

export default WorkplaceHeader
