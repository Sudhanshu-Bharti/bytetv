"use client"

import { Input } from '@/components/ui/input'
import React from 'react'
import CopyButton from './copybutton'
import { Button } from '@/components/ui/button'

interface KeyCardProps {
    value: string | null
}

const KeyCard = ({value}: KeyCardProps) => {
  return (
    <div className='rounded-xl bg-muted p-6'>
        <div className='flex items-start gap-x-10'>
            <p className='font-semibold'>
                    Stream Key
            </p>
            <div className='spcae-y-2 w-full'>
                <div className='w-full flex items-center gap-x-2'>
                    <Input
                        disabled
                        placeholder=' just copy u will get the key'
                        type='text'
                    />
                    <CopyButton value={value || "" }/>
                    {/* <Button size='sm'>
                        Show
                    </Button> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default KeyCard