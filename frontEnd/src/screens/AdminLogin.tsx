

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
import { login, selectUser } from "@/features/userSlice"
import { useEffect } from "react"
import { useLoginMutation } from "@/features/usersApiSlice"
import Loader from "@/components/Loader"



export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

 function AdminLogin() {

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
      navigate('/admin/home')
    }
  },[navigate,user])

const onSubmit:SubmitHandler<TloginSchema>=async(data)=>{
  try {
    console.log('jjkjhh');
    
    const res=await axios.post('/api/admin/login',data)
    console.log(res.data,'jhjggjjgj');
    
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
          loggedIn:true,
        }))        
      }
    }
   
    
    
   catch (error) {
    setError("root", {
      message: "This email is already taken",
    });
    toast("This email is already taken");
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
    <Card className="mx-auto max-w-sm my-10">
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
              defaultValue='sahlathasnim2002@gmail.com'
              required
              {...register('email')}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" defaultValue='AdminSahla' placeholder="password" required {...register('password')}/>
          </div>
          {isLoading&&<Loader/>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}
export default AdminLogin;



