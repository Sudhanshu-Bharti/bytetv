"use client"

import { Stream, User } from '@prisma/client'
import {LiveKitRoom, useParticipants, useRemoteParticipant} from '@livekit/components-react'
import React from 'react'
import { useViewerToken } from '@/hooks/use-viewer-token'
import {Video} from './video'
import Chat from './chat'
import UserAvatar from './user-avatar'
import { Verified } from 'lucide-react'

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

    // const participants = useParticipants()
    // const participant = useRemoteParticipant(user.id)
    // const totalParticipant = participants.length

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
            <div className='flex flex-col-1 gap-y-4 items-center justify-items-start px-6'>
                <UserAvatar 
                    imageUrl={user.imageUrl}
                    username={user.username}
                    isLive={true}
                    showBadge
                />
                <div className='space-y-1 px-2'>
                    <div className='flex items-center gap-x-2'>
                        <h1>{user.username}</h1>
                        <Verified/>
                    </div>
                        <div>
                            <p>{stream.name}    </p>
                        </div>

                    <p>
                        {/* {totalParticipant} viewers */}
                    </p>
                </div>
                </div>         
        </div>
        <div className='col-span-1'>
            <Chat
                viewerName ={name}
                hostName= {user.username}
                hostIdentity={user.id}
                isFollowing={isFollowing}
                isChatEnabled={stream.isChatEnabled}
                isChatDelayed ={stream.isChatDelayed}
                isChatFollowersOnly = {stream.isChatFollowersOnly}
            />
        </div>
       </LiveKitRoom>

    </>
  )
}
