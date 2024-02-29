"use client"
import React from 'react'
import {Fullscreen , KeyRound , MessageCircle , Users} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import NavItem from './nav-item'


const Navigation = () => {
    const pathname = usePathname()
    const {user} = useUser()

    const routes = [
       
        {
            label: "Stream",
            href: `u/${user?.username}/stream`,
            icon: Fullscreen
        },
        {
            label: "Keys",
            href: `u/${user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `u/${user?.username}/chat`,
            icon: MessageCircle
        },
        {
            label: "Community",
            href: `u/${user?.username}/community`,
            icon: Users
        },
    ]

    return (
    <ul className='space-y-2 pt-4 px-2 flex justify-start flex-col'>
       {routes.map((route)=> (
            <NavItem 
                key={route.label}
                label={route.label}
                href={route.href}
                icon={route.icon} 
                isActive = {pathname === route.href} 
            />
        ))
       } 
    </ul>
  )
}

export default Navigation