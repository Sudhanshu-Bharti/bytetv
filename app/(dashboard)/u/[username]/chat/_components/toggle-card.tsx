"use client"
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { updateStream } from '@/actions/stream'

type FieldTypes = "isChatEnabled"| "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
    label: string
    value: boolean
    field: FieldTypes
}

const ToggleCard = ({field,label,value = false} : ToggleCardProps) => {
    const [isPending , startTransition] = useTransition()
    const OnChange =() => {
        startTransition(()=>{
            updateStream({[field]: !value})
            .then( ()=> toast.success('Chat settings updated'))
            .catch(()=> toast.error('Error updating chat settings'))
        })
    }

    return (
    <div className='rounded-xl bg-muted p-6'>
            <div className='flex items-center justify-between'>
                    <p className='font-semibold'>{label}</p>
            </div>
            <div className='space-y-2'>
                    <Switch 
                        onCheckedChange={OnChange}
                        disabled={isPending}
                        checked={value}>
                        {value ? 'On' : 'Off'}
                    </Switch>
            </div>
    </div>
  )
}

export default ToggleCard