import { Button } from '@/components/ui/button'
import { UserButton, currentUser } from '@clerk/nextjs'
import {LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Actions = async () => {
  return (
    <div className='flex items-center justify-end gap-x-2 ml-4'>
        <Button asChild>
            <Link href='/'>
                <LogOut/>
                    Exit
            </Link>
        </Button>
            <UserButton
            afterSignOutUrl='/' />
    </div>
  )
}

export default Actions