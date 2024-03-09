"use client"
import React from 'react'
import { ReceivedChatMessage } from '@livekit/components-react'
import {format} from "date-fns"


interface ChatListProps {
    messages: ReceivedChatMessage[]
    isHidden: boolean
}

const ChatList = ({isHidden,messages}: ChatListProps) => {
    if(isHidden || !messages.length) {
        return <div>
            {isHidden ? "Chat is hidden" : "No messages yet"}
        </div>
    }
  return (
    <div className=' flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full'>
        {messages.map((msg) => (
            <div className='flex gap-2 p-2 rounded-md hover:bg-white/10'>
                    <p>
                        {format(msg.timestamp, "HH: MM")}
                    </p>
                    <div className='flex flex-wrap items-baseline gap-1'>
                        <p className='text-sm font-semibold'>
                                <span >
                                    {msg.from?.name}
                                </span>
                        </p>
                        <p className='text-sm'> 
                            {msg.message}
                        </p>
                    </div>
            </div>
            ))}
    </div>
  )
}

export default ChatList