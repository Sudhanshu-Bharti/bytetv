import React from 'react'

import { getself } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import { Button } from '@/components/ui/button'

import { ConnectModal } from './_components/connnect-model'
import UrlCard from '../chat/_components/url-card'
import KeyCard from '../chat/_components/keycard'


const KeyPage = async () => {
  const self = await getself()

  const stream = await getStreamByUserId(self.id)
  if(!stream){
    throw new Error("Stream not found");
    
  }
  return (
    <div className='ml-60 p-6'>
        <div className='mb-4 space-y-3'>
            <h1 className='font-semibold text-3xl'>Key and URL Settings</h1>
            <ConnectModal />
            <div className='space-y-4'>
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.Streamkey}/>
            </div>
        </div>
    </div>
  )
}

export default KeyPage