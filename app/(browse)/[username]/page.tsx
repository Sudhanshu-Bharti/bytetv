import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import React from 'react'
import Actions from './_components/action'

interface UserPageProps{
    params:{
        username: string
    }
}

const UserPage = async ({params}: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if(!user){
    return null
  }
  const isFollowing = await isFollowingUser(user.id)

  return (
    <div className='ml-60  flex flex-col gap-y-4'>
      <p>username: {user.username}</p>
      <p>id: {user.id}</p>
      <p>isfollowing: {`${isFollowing}`}</p>
      <Actions userId={user.id} isFolllowing= {isFollowing} />
      </div>
  )
}

export default UserPage