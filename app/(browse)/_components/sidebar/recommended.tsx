import { Stream, User } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import UserItem from './user-item'
interface RecommendedProps{
    data: (User &{
        stream: Stream | null
    })[]
}

const Recommended = ({data} : RecommendedProps) => {
     
    return (
    <div>
        <div className='pl-6 mb-4'>
            Recommended
        </div>
        <ul className='space-y-2 px-2'>
            {data.map((user)=> (
                    <UserItem 
                    key={user.id} 
                    username= {user.username}
                    imageUrl= {user.imageUrl}
                    isLive = {user.stream?.isLive}
                    />
            ))}
        </ul>
    </div>
  )
}

export default Recommended