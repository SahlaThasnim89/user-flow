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
// import { Upload } from "lucide-react";
// import { Image } from "lucide-react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import axios from 'axios';
import { signUpSchema,TsignUpSchema} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { login } from "@/features/userSlice";



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
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isSubmitting },
  //   setError,
  //   watch,
  // } = useForm<formFields>();
  const {register,
    handleSubmit,
    formState:{errors,isSubmitting},
    // reset,
    setError,
  }=useForm<TsignUpSchema>({
    resolver:zodResolver(signUpSchema),
  })
  

  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const navigate=useNavigate()
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
        toast.success('registration successful')
        navigate('/')
        dispatch(login({
          name:data.name,
          email:data.email,
          
        }))
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
      {/* <CardTitle className="text-xl font-bold px-96 pt-5">Sign Up</CardTitle> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
          {/* <div className="overflow-hidden">
            <CardHeader>
              <CardTitle className="pt-3">User Image</CardTitle>
              <CardDescription>Add the image of user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <label htmlFor="imgUpload">
                  {imagePreview ? (
                    <img
                      className="aspect-square  rounded-md object-cover h-[300px] w-[300px]"
                      src={imagePreview}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      width="300"
                    />
                  )}
                </label>
                <div className="grid grid-cols-1 gap-2 w-full">
                  <button className="flex w-full h-12 items-center justify-center rounded-md border border-dashed">
                    <Upload
                      type="file"
                      className="h-4 w-4 text-muted-foreground"
                    />
                    <span className="sr-only">Upload</span>
                    <input
                      accept="image/*"
                      {...register("image",{
                        onChange:handleImageChange
                      })}
                      type="file"
                      hidden
                      id="imgUpload"
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </div> */}

          {/* <div> */}
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
                    type="confirm-password"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                  />
                </div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  {isSubmitting ? "Loading..." : "Create an account"}
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
