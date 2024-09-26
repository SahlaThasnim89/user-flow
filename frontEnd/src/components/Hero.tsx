import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
 

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle className='pb-4'>MERN Authentication</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                  This is a boiler plate for MERN Authentication that stores JWT in an HTTP-only cookie. it also uses redux Toolkit.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 

                  </CardDescription>
                </CardHeader>
                <CardFooter className='gap-5 flex justify-center mt-5'>
                <Link to='/register'>
                  <Button>Sign Up</Button>
                  </Link>
                  <Link to='/login' >
                  <Button>Login</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              
            </div>
    </div>
  )
}

export default Hero