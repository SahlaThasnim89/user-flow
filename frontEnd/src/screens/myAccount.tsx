import React, { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
import { CircleUser } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/userSlice'
import { Link } from 'react-router-dom'



const myAccount = () => {
   
  const user=useSelector(selectUser)


  return (
    <div>
            <Card className="mx-auto max-w-sm my-10">
      <CardHeader>
        <CardTitle className="text-2xl text-center">My Account</CardTitle>
        <CardDescription className='text-center'>
          Account Details
        </CardDescription>
      </CardHeader>
      <CardContent>
      <div className='flex justify-center mb-4'>
        {user.image?(
            <img className="h-20 w-20 rounded-full" src={user.image} />
        ):( 
      <CircleUser className="h-20 w-20" />
        )}
      </div>
        <h1 className='my-4 text-center'>{user.name}</h1>
        <h1 className='my-4 text-center'>{user.email}</h1>
        <Link to='/editProfile'>
        <Button className="w-full">
            Edit Profile
          </Button>
          </Link>
      </CardContent>
    </Card>
    </div>
  )
}

export default myAccount