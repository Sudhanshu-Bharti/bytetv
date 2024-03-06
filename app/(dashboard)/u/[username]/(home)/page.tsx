import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { getUserByUsername } from '@/lib/user-service'

import { StreamPlayer } from '@/components/stream-player'

interface CreatorPageProps {
  params :{
    username: string
  }
}

const CreatorPage = async ({params}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username)

  if (!user || user.externalId !== externalUser?.id || !user.stream) {
    throw new Error('User not found')
  }

  return (
    <div className='ml-60 h-full'>
      <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={true}
      />
    </div>
  )
}

export default CreatorPage