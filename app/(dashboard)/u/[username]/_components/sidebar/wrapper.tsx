import React from 'react'


const Wrapper = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='fixed left-0 flex-col w-60 h-full bg-background border-r z-50'>
        {children}
    </div>
  )
}

export default Wrapper