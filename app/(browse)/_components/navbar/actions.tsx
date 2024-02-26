import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import { Clapperboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Actions = async () => {
    const user = await currentUser()
  return (
    <div className='flex items-center justify-end gap-x-2 ml-4'>
       {!user && (
        <SignInButton>
            <Button>
                Login
            </Button>
        </SignInButton>
        )}
        {!!user && (
            <div className='flex item-center gap-x-4'>
                    <Button 
                    variant='ghost' 
                    className='text-muted-foreground hover:text-primary' 
                    size='sm'
                    asChild>
                        <Link href={`/u/${user.username}`}>
                            <Clapperboard className='h-5 w-5 text-muted-foreground' />
                            Dashboard
                        </Link>
                    </Button>
                    <UserButton  afterSignOutUrl='/'/>
            </div>
        )}
    </div>
  )
}

export default Actions