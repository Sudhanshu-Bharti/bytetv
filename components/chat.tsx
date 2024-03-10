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
        if (!send) return;
    
        send(value);
        setValue("");
      };

    const onChange =(value : string)=> {
        setValue(value)
    }

    return (
    <div className='flex flex-col h-full bg-background ml-60'>
        <>

        <div className='p-3 border-b'>
            <ChatHead 
            onSubmit={onSubmit}
            value= {value} 
            onChange={onChange} 
            isHidden={isHidden} 
            isChatFollowersOnly={isChatFollowersOnly} 
            isChatDelayed={isChatDelayed} 
            isFollowing={isFollowing} 
            hostName={hostName} 
            viewerName={viewerName}
            messages={reverseMsg}
            />
        </div>
        </>
    </div>
  )
}

export default Chat