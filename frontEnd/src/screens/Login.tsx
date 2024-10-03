

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema } from "@/lib/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { TloginSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "@/features/userSlice"
import { useEffect } from "react"
import { useLoginMutation } from "@/features/usersApiSlice"
import Loader from "@/components/Loader"
logout


export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

 function Login() {

  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
    setError
  }=useForm<TloginSchema>({resolver:zodResolver(loginSchema)})

  const navigate=useNavigate()
  const dispatch=useDispatch();

  const [loginApiCall,{isLoading}]=useLoginMutation();
  
  const user=useSelector(selectUser)

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[navigate,user])


const onSubmit:SubmitHandler<TloginSchema>=async(data)=>{
  try {
    const res=await axios.post('/api/login',data)
    if(res.data.isBlocked){
      dispatch(logout());
      toast.error('your account has been blocked')
      return;
    }
    

    if(res.data.errors){
      const errors=res.data.errors;
    
      if(errors.email){
        setError('email',{
          type:'server',
          message:errors.email,
        })
      }else if(errors.password){
          setError('password',{
            type:'server',
            message:errors.password,
          })
        }else{
          toast.error('something went wrong');
          
        }
      }else{
        // await loginApiCall({email:res.data.email,password:res.data.password}).unwrap()
        toast.success('successfully logged in')        
        dispatch(login({
          name:res.data.name,
          email:res.data.email,
          image:res.data.image,
          isBlocked:res.data.isBlocked,
          loggedIn:true,
        }))        
      }
    }
   
    
    
   catch (error) {
    setError("root", {
      message: "This email is already taken",
    });
    toast("No user found");
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
    <Card className="mx-auto max-w-sm mt-28">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit,errHandler)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register('email')}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" placeholder="password" required {...register('password')}/>
          </div>
          {isLoading&&<Loader/>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to='/register' className="underline">
            Sign up
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}
export default Login



