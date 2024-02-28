import React from 'react'
import Wrapper from './wrapper'
import Recommended from './recommended'
import { getRecommended } from '@/lib/recommended-service'
import { getFollowingUsers } from '@/lib/follow-service'
import Following from './following'

const Sidebar =  async () => {
    const recommended = await getRecommended()
    const following = await getFollowingUsers()

  return (
    <Wrapper>
        <div className='pt-0 space-y-4'>
          <div>
            <p className='text-muted-foreground p-2 font-semibold'>
              For You
            </p>
          </div>
          <Following data= {following}/>
          <Recommended data= {recommended}/> 
          
        </div>
    </Wrapper>
  )
}

export default Sidebar