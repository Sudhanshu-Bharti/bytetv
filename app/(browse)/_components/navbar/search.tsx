'use client'
import React, { useState } from 'react'
import qs from 'query-string'
import { Search as SearchIcon , X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { skip } from 'node:test'


const Search = () => {

  const router = useRouter()
  const [value , setValue] = useState('')

  const onSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!value) return

    const url = qs.stringifyUrl({
      url: '/search',
      query: {term : value}
    }, {skipEmptyString: true})

    router.push(url)
  }
  const onClear = () => {
    setValue('')
  }

  return (
    <form
    onSubmit={onSubmit}
    className='relative w-full lg:w-[400px] flex items-center'
    >
        <Input
        value={value}
        onChange= {(e)=> setValue(e.target.value)}
        placeholder='Search'
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent'
        />
        {value && 
        (<X 
        className='right-14 absolute text-muted-foreground' 
        onClick={onClear}/> )}
        <Button type='submit' size='sm' variant='secondary' className='rounded-l-none'>
          <SearchIcon className='h-5 w-5 text-muted-foreground'/>
        </Button>
    </form>
  )
}

export default Search