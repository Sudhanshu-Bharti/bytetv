import { getself } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'
import ToggleCard from './_components/toggle-card'

const ChatPage = async () => {
    const self = await getself()
    const stream = await getStreamByUserId(self.id)

    if(!stream){
        throw new Error('Stream not found')
    }
  return (
    <div  className='ml-60 p-6'>
        <div className='mb-4'>
            <div className='text-3xl font-bold'>
                Chat Settings
            </div>
            <div className='space-y-4'>
                    <ToggleCard 
                        field='isChatEnabled'
                        label= "Enable Chat"
                        value= {stream.isChatEnabled}
                        />
                    <ToggleCard 
                        field='isChatDelayed'
                        label= "Delay Chat"
                        value= {stream.isChatDelayed}
                        />
                    <ToggleCard 
                        field='isChatFollowersOnly'
                        label= "Followers Only Chat"
                        value= {stream.isChatFollowersOnly}
                        />
            </div>
        </div>
    </div>
  )
}

export default ChatPage