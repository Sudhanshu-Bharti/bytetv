"use client"
import { Button } from '@/components/ui/button'
import React, { startTransition, useTransition } from 'react'
import { onFollow , unFollow } from '@/actions/follow'
import { toast } from 'sonner'

interface ActionsProps{
    isFolllowing: boolean,
    userId: string
}

const Actions = ( {isFolllowing, userId}: ActionsProps) => {
    const [isPending , startTransition] = useTransition()
    const handleFollow = () => {
        
        startTransition( ()=> {
            onFollow(userId)
            //@ts-ignore
            .then( (data)=> toast.success(`Followed user: ${data?.following.username}`))
            .catch( ()=> toast.error("Failed to follow"))
        })
    }
    const handleUnfollow = () => {
        
        startTransition( ()=> {
            unFollow(userId)
            //@ts-ignore
            .then( (data)=> toast.success(`Unfollowed user: ${data?.following.username}`))
            .catch( ()=> toast.error("Failed to follow"))
        })
    }

    const onClick = () => {
        if(isFolllowing){
            handleUnfollow()
        } else {
            handleFollow()
        }
    }
  return (
    <Button 
    disabled={ isPending} 
    onClick={onClick} 
    variant='default'>
        {isFolllowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default Actions