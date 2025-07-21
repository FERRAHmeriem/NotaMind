import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function WorkplaceHeader() {
  return (
    <div className='py-4 px-16 flex items-center justify-between shadow-sm'>
        <Image src='/notamind_row.png' alt='logo' width={150} height={50} priority style={{ height: 'auto' }} />
        <div className="transform scale-155 "> 
            <UserButton />
        </div>
    </div>
  )
}

export default WorkplaceHeader