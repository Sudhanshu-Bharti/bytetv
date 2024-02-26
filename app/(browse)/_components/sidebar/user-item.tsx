'use client'
import React from 'react'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import UserAvatar from '@/components/user-avatar'

interface userItemProps{   
    username: string,
    imageUrl: string,
    isLive?: boolean
 }

const UserItem = ({username , imageUrl , isLive} : userItemProps ) => {
  const pathname = usePathname()
    
  const href =  `/${username}`
  const isActive = pathname === href

    return (

        <Button asChild
            variant='ghost'
            className={cn(
                'w-full h-12',
                isActive && 'bg-accent'
        )}
        >
                <Link href={href}>
                    <div className='flex items-center w-full gap-x-4'>
                            <UserAvatar
                                imageUrl={imageUrl}
                                username={username}
                                isLive={isLive}
                            
                            />
                             <p className='font-semibold'>
                             {`@${username}`}
                             </p>
                             {isLive && (
                                    <div className='w-16 h-5 bg-red-500 rounded-md text-xs'>LIVE</div>
                                
                             )}
                    </div>
                </Link>
        </Button>
  )
}

export default UserItem