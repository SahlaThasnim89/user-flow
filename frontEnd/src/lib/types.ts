// import {z} from 'zod';
import * as z from 'zod';


export const signUpSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6,'Password must contain 6 charecters'),
    confirmPassword:z.string(),
  }).refine((data:any)=>data.password===data.confirmPassword,{
    message:"password must match",
    path:["confirmPassword"]
  })
  
  export type TsignUpSchema=z.infer<typeof signUpSchema>;

  export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6,'Password must contain 6 charecters'),
  })
  
  export type TloginSchema=z.infer<typeof loginSchema>;