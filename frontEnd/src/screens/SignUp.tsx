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
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import { Image } from "lucide-react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import axios from 'axios';

type formFields = {
  name: string;
  email: string;
  password: string;
  image: File | null;
  confirmPassword: string;
};

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    watch,
  } = useForm<formFields>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      console.log('oiuouo');
      
      const res=await axios.post('/api/register',data)
      console.log(res.data);
      toast.success('registration successful')
      throw new Error();
      console.log(data);
    } catch (e) {
      setError("root", {
        message: "This email is already taken",
      });
      toast("This email is already taken");
    }
  };

  const errFn: SubmitErrorHandler<formFields> = (err) => {
    Object.values(err)
      .forEach((e) => {
        console.log(e);
        
        toast.error(e.message);
      });
  };

  return (
    <Card className="mx-auto max-w-4xl my-10">
      <CardTitle className="text-xl font-bold px-96 pt-5">Sign Up</CardTitle>
      <form onSubmit={handleSubmit(onSubmit, errFn)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="overflow-hidden">
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
          </div>

          <div>
            <CardHeader>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="user-name">User name</Label>
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
                    {...register("email", {
                      // required: "email is required",
                      // validate: (value) => {
                      //   if (!value.includes("@")) {
                      //     return toast('Email must include "@"');
                      //   }
                      //   return true;
                      // },
                    })}
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
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) => {
                        const password = watch("password");
                        if (value !== password) {
                          toast("Passwords do not match");
                          return false;
                        }
                        return true;
                      },
                    })}
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
            </CardContent>
          </div>
        </div>
      </form>
    </Card>
  );
}
export default SignUp;
