"use client"
import { Button } from '@/components/ui/button'
import { CheckCheck, Copy } from 'lucide-react'
import React, { useState } from 'react'

interface CopyButtonProps {
    value: string
}

const CopyButton = ({value}: CopyButtonProps) => {
    const [isCopied , setIsCopied] = useState(false)

    const onCopy =() => {
        if(!value) return

        setIsCopied(true)
        navigator.clipboard.writeText(value)
        
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    const Icon = isCopied ? CheckCheck : Copy
    return (
    <Button
        onClick={onCopy}
        disabled={isCopied || !value}
        variant='outline'
        >
            <Icon className='w-3 h-3' />
    </Button>
  )
}

export default CopyButton