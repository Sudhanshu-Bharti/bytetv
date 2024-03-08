import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import React, { useRef, useState, useEffect } from 'react'
import FullScreenControl from './full-screen'
import VolumeControl from './volume-control'

interface LiveVideoProps {
    participant: Participant
}


const LiveVideo = ({participant}: LiveVideoProps) => {
    
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [volume , setVolume] = useState(0)
    
    const toggleFullscreen = () => {
        if (!wrapperRef.current) return;
    
        if (!isFullScreen) {
            wrapperRef.current.requestFullscreen().catch(err => {
            // alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
        } else {
          document.exitFullscreen();
        }
    
        setIsFullScreen(!isFullScreen);
      };
    
    const onVolumeChange = (value: number) => {
        setVolume(+value)
    if (videoRef?.current) {
        videoRef.current.muted = value === 0;
        videoRef.current.volume = +value * 0.01;
    }
    }
    
    const toggleMute = ()=> {
        const isMuted = volume=== 0
        setVolume(isMuted ? 50 : 0)

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted? 0.5 : 0;
        }   
    }

    useEffect(() => {
        onVolumeChange(0)
    } , [])

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
    <div className='relative h-full flex' ref={wrapperRef} >
            <video ref={videoRef} width="100%" />
            <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
                <div className='absolute bottom-0 flex h-14 w-full items-center justify-between'>
                        <VolumeControl
                            onChange={onVolumeChange}
                            onToggle={toggleMute}
                            value={volume}
                            />
                        <FullScreenControl isFullScreen={isFullScreen} onToggle={toggleFullscreen} />
                </div>
            </div>
        </div>
  )
}

export default LiveVideo