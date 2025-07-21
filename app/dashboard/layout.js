import React from 'react'
import Sidebar from './_component/sidebar'
import Header from './_component/header'
function DashboardLayout({children}) {
  return (
    <div >
        <div className='md:w-64 fixed h-screen' >
            <Sidebar />
        </div>
        <div className='md:ml-64'>
            <Header/>
            <div className='p-8'>
            {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout