import React from 'react'
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className='shadow-sm p-8 flex items-center justify-end'>
      <div className="transform scale-195"> 
        <UserButton />
      </div>
    </div>
  );
}

export default Header
