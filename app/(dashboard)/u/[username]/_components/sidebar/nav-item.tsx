"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
    label: string
    href: string
    icon: LucideIcon
    isActive: boolean
    
}

const NavItem = ({ href,icon: Icon, isActive,label} : NavItemProps) => {

  return (
    <Button 
        asChild
        variant='ghost'
        className={cn(
            "w-full h-12",
            "justify-start",
            isActive && "bg-accent",
        )}
    >
        <div className='items-center gap-x-4'>
        <Link href={href}>
            <Icon
                width='30'
                height='30'
                className='mr-2' 
            />
            <span className='text-sm'>
                {label}
            </span>
        </Link>
        </div>
    </Button>
  )
}

export default NavItem