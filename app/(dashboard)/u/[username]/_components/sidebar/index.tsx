import React from 'react'
import Wrapper from './wrapper'
import Navigation from './navigation'

const Sidebar = () => {
  return (
    <Wrapper>
        <div className='w-full items-center justify-center pt-4 mb-4 pl-3'>
            <div className='font-bold '>
                <p>Dashboard</p>
            </div>
        <Navigation/>
        </div>
    </Wrapper>
  )
}

export default Sidebar