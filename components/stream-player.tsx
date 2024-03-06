"use client"

import { Stream, User } from '@prisma/client'
import React from 'react'
import {LiveKitRoom, VideoConference, VideoTrack} from "@livekit/components-react"

interface StreamPlayerProps {
    user: User & {stream: Stream | null}
    stream : Stream
    isFollowing: boolean
}

export const StreamPlayer = ({user, stream, isFollowing}: StreamPlayerProps) => {
    
    return (
    <div>
       
       
    </div>
  )
}
