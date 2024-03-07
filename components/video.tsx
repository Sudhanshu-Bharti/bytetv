"use client"
import React, { useRef } from 'react'
import { ConnectionState, Track } from 'livekit-client'
import { VideoTrack, useConnectionState, useRemoteParticipant , useTracks } from '@livekit/components-react'


interface VideoProps { 
    hostname: string
    hostIdentity: string    
 }


const Video = ({hostIdentity, hostname}: VideoProps) => {
    
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
    const videoEl = useRef<HTMLVideoElement>(null);
    
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
        ]).filter((track) => track.participant.identity === hostIdentity)

    let content    
    
    if(!participant && connectionState === ConnectionState.Connected){
        content = <p>offline</p>

    }else if ( !participant || tracks.length === 0){
        content = <p>loading..</p>
    }
    else {
        content = <p>Live video</p>
    }

    useTracks(Object.values(Track.Source))
    .filter((track) => track.participant.identity === hostIdentity)
    .forEach((track) => {
      if (videoEl.current) {
        track.publication.track?.attach(videoEl.current);
      }
    });
  return (
    <div className='aspect-video border-b group relative'>
        {/* {content} */}
        <video ref={videoEl} width="100%" />
        </div>
  )
}

export default Video