
import React from 'react'
import { Logo } from '../Logo'
import Search from './search'
import Actions from './actions'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-20 z-1 bg-purple-950 px-2 flex justify-between items-center shadow-sm'>
        <Logo />
        <Search/>
        <Actions/>

    </nav>
  )
}

export default Navbar