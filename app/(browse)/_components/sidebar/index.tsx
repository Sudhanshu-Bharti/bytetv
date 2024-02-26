import React from 'react'
import Wrapper from './wrapper'
import Recommended from './recommended'
import { getRecommended } from '@/lib/recommended-service'

const Sidebar =  async () => {
    const recommended = await getRecommended()


  return (
    <Wrapper>
        <div className='pt-0 space-y-4'>
          <div>
            <p className='text-muted-foreground p-2 font-semibold'>
              For You
            </p>
          </div>
          <Recommended data= {recommended}/>
        </div>
    </Wrapper>
  )
}

export default Sidebar