import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
interface UserAvatarProps {
    imageUrl: string
    username: string
    isLive?: boolean
    showBadge?: Boolean
}

const UserAvatar = ({imageUrl, username , isLive,showBadge}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive
  return (
    <div className='relative'>
        <Avatar className={cn(
            isLive && 'ring-2 ring-accent  ring-red-500',

        )}>
            <AvatarImage 
            src={imageUrl}
            alt={username}
            className='object-cover'
            />
            {/* <AvatarFallback>
                {username[0]}
                {username[username.length - 1]}
            </AvatarFallback> */}
            {canShowBadge && (
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full'></div>
            )}
           
        </Avatar>
        
    </div>
  )
}

export default UserAvatar