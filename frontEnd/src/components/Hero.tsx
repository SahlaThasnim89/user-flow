import React, { useEffect } from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '@/features/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
 

const Hero = () => {

  const user=useSelector(selectUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
 

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[navigate,user])

  
  useEffect(()=>{
    const check=async()=>{
      if(user){
        try {
          const res=await axios.get('/api/account')
          const user=res.data;
          console.log(user);
          
          if(res.data.isBlocked){
            dispatch(logout())
            toast.error('your account has been blocked')
            navigate('/')
          }
        } catch (error) {
          console.error('error in blocking',error);
          
        }
      }
    }
    const time=setInterval(check,5000)
    return()=>clearInterval(time)
  },[user,dispatch,navigate])
  

  return (
    <div className="flex items-center justify-center min-h-screen">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="mb-3">
                  {user?
                  <CardTitle className='mb-4'>WELCOME <span className='text-red-500'>{user.name}!</span></CardTitle>
                  :
                  <CardTitle className='mb-4'>MERN Authentication</CardTitle>
                }

                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                  This is a boiler plate for MERN Authentication that stores JWT in an HTTP-only cookie. it also uses redux Toolkit.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 

                  </CardDescription>
                </CardHeader>
                <CardFooter className='gap-5 flex justify-center mt-5'>
                </CardFooter>
              </Card>
              
              
            </div>
    </div>
  )
}

export default Hero