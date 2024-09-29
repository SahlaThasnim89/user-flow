import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUpSchema, TsignUpSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUser } from '@/features/userSlice';


const editUser = () => {
  const {register,
    handleSubmit,
    formState:{errors,isSubmitting},
    // reset,
    setError,
  }=useForm<TsignUpSchema>({
    resolver:zodResolver(signUpSchema),
  })

  const user=useSelector(selectUser)



const onSubmit: SubmitHandler<TsignUpSchema> = async (data) => {
try {
  
} catch (e) {
  
}
}



  const errHandler=(e:any)=>{
    Object.values(e).reverse().forEach(e=>{
      toast.error("sign up failed",{
        description:e.message as string
      })
    })
    
  }


  return (
    <div>
          <Card className="mx-auto max-w-md w-[28rem] my-16">
            <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit(onSubmit, errHandler)}>



            
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Edit Profile
                </Button>
                {/* {errors.root&&(<div className="text-red-500">{errors.root.message}</div>)} */}
                {/* {errors.root&&(toast(errors.root.message))} */}
            </form>
            </CardContent>
     </Card>
    </div>
  )
}

export default editUser