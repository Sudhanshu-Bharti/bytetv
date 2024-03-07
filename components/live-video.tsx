import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import { VideoOff } from 'lucide-react'
import React, { useRef } from 'react'

interface LiveVideoProps {
 participant: Participant
}


const LiveVideo = ({participant}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
        ]).filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if(videoRef.current){
                track.publication.track?.attach(videoRef.current)
            }
        })

  return (
    <div className='relative h-full flex'>
        <video width="100%" />
        </div>
  )
}

export default LiveVideo