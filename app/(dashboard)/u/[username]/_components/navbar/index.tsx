
import React from 'react'
import { Logo } from '@/app/(browse)/_components/Logo'
import Actions from './actions'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-20 z-1 bg-blue-950 px-2 flex justify-between items-center shadow-sm'>
        <Logo />
        <Actions/>
    </nav>
  )
}

export default Navbar