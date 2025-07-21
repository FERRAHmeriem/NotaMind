import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Layout } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import UplaodPdf from './uplaodPdf'
function Sidebar() {
  return (
    <div className='shadow-lg w-full h-screen flex flex-col items-center justify-between  pt-4 pb-8 '>
      <div className='space-y-16 flex flex-col items-center'>
        <Image src='/notamind_row.png' alt='logo' width={200} height={50} priority style={{  height: 'auto'   }} />
        <div>
          <UplaodPdf/>
          <div className='flex items-center justify-center gap-4  hover:bg-gray-100 p-2 rounded-md mt-4'>
            <Layout/>
            <p>Workplace</p>
          </div>
        </div>
      </div>
      <div className='w-[85%]'>
      <Progress value={33} />
      <p className='text-sm mt-1 text-center'>2 out of 5 uploaded</p>
      </div>
      
    </div>
  )
}

export default Sidebar