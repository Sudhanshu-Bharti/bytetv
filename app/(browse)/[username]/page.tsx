import React from 'react'

interface UserPageProps{
    params:{
        username: string
    }
}

const UserPage = ({params}: UserPageProps) => {
  return (
    <div className='ml-60'>UserPage: {params.username}</div>
  )
}

export default UserPage