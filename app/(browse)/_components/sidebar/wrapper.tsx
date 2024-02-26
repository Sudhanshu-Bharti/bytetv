import React from 'react'

interface WrapperProps{
    children: React.ReactNode
}

const Wrapper = ( {children} : WrapperProps) => {

  return (
    <aside className='fixed h-full bg-background w-60 left-0 flex flex-col z-50'>
        {children}
    </aside>
  )

}

export default Wrapper