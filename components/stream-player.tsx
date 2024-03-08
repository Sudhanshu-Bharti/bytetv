"use client"

import { Stream, User } from '@prisma/client'
import {LiveKitRoom} from '@livekit/components-react'
import React from 'react'
import { useViewerToken } from '@/hooks/use-viewer-token'
import {Video} from './video'

interface StreamPlayerProps {
    user: User & {stream: Stream | null}
    stream : Stream
    isFollowing: boolean
}

export const StreamPlayer = ({user, stream, isFollowing}: StreamPlayerProps) => {
    const {token , name , identity} =  useViewerToken(user.id)
    // console.log("\ntoken" , token);
    // console.log("\nname" , name);
    console.log({token , name , identity} )

    
    if(!token || !name || !identity){
        <div>
            <h1>Not allowed</h1>
        </div>
    }

    return (
    <>
       <LiveKitRoom
        token={token} 
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className='grid grid-cols-1 h-full'
       >
        <div className='space-y-4 col-span-1 hidden-scrollbar pb-10'>
            <Video
            hostName={user.username}
            hostIdentity={user.id}
            />
                
        </div>
       </LiveKitRoom>

    </>
  )
}
