import React from 'react'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>  
        <Navbar/>
        <div className=' h-full pt-20'>
        <Sidebar/>
          {children}
        </div>
    </>
  )
}

export default layout