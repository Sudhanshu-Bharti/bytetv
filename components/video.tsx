"use client"
import React from 'react'
import { ConnectionState, Track } from 'livekit-client'
import { useConnectionState, useRemoteParticipant , useTracks } from '@livekit/components-react'
import { User } from '@prisma/client'
import LiveVideo from './live-video'


interface VideoProps { 
    hostname: string
    hostIdentity: string
 }


const Video = ({hostIdentity, hostname}: VideoProps) => {

    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity);
    // console.log({participant});
    
    // if (!participant) {
    //   console.log('No participant found with the identity:', hostIdentity);
    // } else {
    //   console.log('Participant found:', participant);
    // }
    
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
        ]).filter((track) => track.participant.identity === hostIdentity)
        

        // console.log(participant);
        console.log("tracks", tracks.length);
        
    let content    
    
    if(!participant && connectionState === ConnectionState.Connected){
        content = <p>offline</p>

    }else if ( !participant || tracks.length === 0){
        content = <p>loading..</p>
    }
    else {
        content = <LiveVideo participant={participant}/>
    }

  return (
    <div className='aspect-video border-b group relative'>
        {content}
        </div>
  )
}

export default Video