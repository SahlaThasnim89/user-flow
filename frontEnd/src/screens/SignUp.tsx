import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from 'axios';
import { signUpSchema,TsignUpSchema} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "@/features/userSlice";
import Loader from "@/components/Loader";
import { useRegisterMutation } from "@/features/usersApiSlice";



// type formFields = {
//   name: string;
//   email: string;
//   password: string;
//   image: File | null;
//   confirmPassword: string;
// };



export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

function SignUp() {
  const {register,
    handleSubmit,
    formState:{errors,isSubmitting},
    // reset,
    setError,
  }=useForm<TsignUpSchema>({
    resolver:zodResolver(signUpSchema),
  })


  const user=useSelector(selectUser)
  const navigate=useNavigate()

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[navigate,user])

  const [registerApiCall,{isLoading}]=useRegisterMutation();



  const dispatch=useDispatch();


  const onSubmit: SubmitHandler<TsignUpSchema> = async (data) => {
    try {
      const res=await axios.post('/api/register',data)
    
      console.log(res.data);
      
      if(res.data.errors){
        const errors=res.data.errors;

        if(errors.name){
          setError("name",{
            type:"server",
            message:errors.name,
          })
        
        }else if(errors.email){
            setError("email",{
              type:"server",
              message:errors.email,
            })
        }else if(errors.password){
          setError("password",{
            type:"server",
            message:errors.password,
          })
      }else if(errors.confirmPassword){
        setError("confirmPassword",{
          type:"server",
          message:errors.confirmPassword,
        })
    
      }else{
        toast.error("something went wrong!")
      }
      }else{
        // await registerApiCall({name,email,password}).unwrap()
        toast.success('registration successful')
        dispatch(login({
          name:res.data.name,
          email:res.data.email,
          image:res.data.image,
          loggedIn:true,
        }))
        navigate('/')
        //  throw new Error();
        //  console.log(data);
      }
    }
    catch (e) {
      setError("root", {
        message: "This email is already taken",
      });
      toast("This email is already taken");
    };
  }


  const errHandler=(e:any)=>{
    Object.values(e).reverse().forEach(e=>{
      toast.error("sign up failed",{
        description:e.message as string
      })
    })
    
  }

  return (
    <Card className="mx-auto max-w-md w-[28rem] my-16">
            <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>

              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit(onSubmit, errHandler)}>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">User name</Label>
                  <Input
                  id="name"
                    placeholder="User Name"
                    required
                    {...register("name")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    required
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...register("password")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                  />
                </div>
                {isLoading&&<Loader/>}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Create an account
                </Button>
                {/* {errors.root&&(<div className="text-red-500">{errors.root.message}</div>)} */}
                {/* {errors.root&&(toast(errors.root.message))} */}
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
      </form>
            </CardContent>
          {/* </div> */}
        {/* </div> */}
     </Card>
  );
}
export default SignUp;
