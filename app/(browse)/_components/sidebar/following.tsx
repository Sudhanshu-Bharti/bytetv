"use client"
import { Follow, User } from '@prisma/client'
import React from 'react'
import UserItem from './user-item'


interface FollowingProps{
    data: (Follow & {following: User})[]
}

const Following = ({data} : FollowingProps) => {

    if(!data.length){ return null}

  return (
    <div className=' pl-6 mb-4'>
        <p>Following</p> 
        <ul className='space-y-2 px-2'>
            {data.map((follow)=> (
                <UserItem 
                key={follow.following.id}
                username={follow.following.username} 
                imageUrl={follow.following.imageUrl}/>
            ))}
        </ul>
    </div>
  )
}

export default Following