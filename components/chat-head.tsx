"use client"
import React, { use, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Info, Send } from 'lucide-react'
interface ChatHeadProps {
    onSubmit: () => void   
    value: string
    onChange: (value: string) => void
    isHidden: boolean
    isChatFollowersOnly: boolean
    isChatDelayed: boolean
    isFollowing: boolean
    hostName: string
    viewerName: string

}


const ChatHead = ({hostName,isChatDelayed,isChatFollowersOnly,isFollowing,isHidden,onChange,onSubmit,value,viewerName}: ChatHeadProps) => {
  const [isDelayedBlocked , setIsDelayedBlocked] = useState(false)

  const FollowersOnlyButNotFollowed = isChatFollowersOnly && !isFollowing
  const isDisabled = isHidden || FollowersOnlyButNotFollowed || isDelayedBlocked

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value || isDisabled) {
      return
    }

    if( isChatDelayed || !isDelayedBlocked){
        setIsDelayedBlocked(true)
        setTimeout(() => {      
            setIsDelayedBlocked(false)
            onSubmit()
        }, 3000);

    }else{
        onSubmit()
    }
  }

  if (isHidden) {
    return null
  }
  
    if (isChatDelayed) {
        return "Chat is delayed"
    } else if (isChatFollowersOnly && !isFollowing) {
        return "Follow to chat"
    } else if (isChatDelayed) {
        return "Chat is delayed"
    } else if (isChatDelayed && isChatFollowersOnly) {
        return "Chat Followers only. msg is 3 sec delayed"

    } else if(!isChatDelayed && !isChatFollowersOnly){
        return null
    }

  
  return (
        <>
            <div className='p-2 text-muted-forground bg-white border border-white  w-full rounded-t-md flex items-center gap-x-2'>
                <Info className='h-4 w-4' />
                <p className='text-xs font-semibold'>
                    {isChatFollowersOnly ? 'Followers Only' : 'Public'}
                </p>
            </div>

                {/* <ChatList
                    isHidden={isHidden}

                /> */}
                <form  onSubmit={onSubmit} className='flex flex-col items-center p-3 gap-y-4'>
                <p className='font-semibold text-center'>
                    Stream Chat
                </p>
                <div className='w-full'>
                    <Input 
                    onChange={(e)=>onChange(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Type a message"
                    className='border-white text-white'
                    />
                </div>
                <div className='ml-auto'>
                    <Button
                    type='submit'
                    variant={isChatFollowersOnly ? 'secondary' : 'default'}
                    size='sm'
                    disabled={isDisabled}
                    >
                    Send 
                    <Send size='15'/>
                    </Button>
                </div>
            </form>
        
        </>
            
            

  )
}

export default ChatHead