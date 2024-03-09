import { LiveKitRoom, useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import React, { useMemo, useState } from 'react'
import ChatHead from './chat-head'
interface ChatProps{
    viewerName : string
    hostName:string
    hostIdentity:   string
    isFollowing:boolean
    isChatEnabled: boolean
    isChatDelayed : boolean
    isChatFollowersOnly : boolean
}

const Chat = ({hostIdentity,hostName,isChatDelayed,isChatEnabled,isChatFollowersOnly,isFollowing,viewerName} : ChatProps) => {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isOnline = participant && connectionState === ConnectionState.Connected

  const  isHidden =  !isChatEnabled || !isOnline
  
  const [value , setValue] = useState("")
  const {chatMessages : messages, send} = useChat()  

    // const reverseMsg = messages.slice().reverse()
    const reverseMsg = useMemo(() => messages.sort((a,b) => b.timestamp - a.timestamp  ) , [messages])
    const onSubmit = () => {
        if(!send) return

        send(value)
        setValue("")
    }

    const onChange =(value : string)=> {
        setValue(value)
    }

    return (
    <div className='flex flex-row-reverse items-center justify-center bg-background border-l pt-0 h-[calc(100vh-80px)]'>
        <>

        <div className=' p-3 border-b flex justify-end'>
            <ChatHead 
            onSubmit={onSubmit}
            value= {value} 
            onChange={onChange} 
            isHidden={isHidden} 
            isChatFollowersOnly={isChatFollowersOnly} 
            isChatDelayed={isChatDelayed} 
            isFollowing={isFollowing} 
            hostName={hostName} 
            viewerName={viewerName} />
        </div>
        </>
    </div>
  )
}

export default Chat