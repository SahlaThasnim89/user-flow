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



  export const ProfileSchema=z.object({
    name:z.string().optional(),
    password:z.string().optional().refine((val)=>!val||val.length>=6,{
      message:'Password must contain 6 charecters'}),
    confirmPassword:z.string().optional(),
  }).refine((data:any)=>{
    if(data.password){
      return data.password===data.confirmPassword
    }
    return true
  }
    ,{
    message:"password must match",
    path:["confirmPassword"]
  })

  export type TProfileSchema=z.infer<typeof ProfileSchema>;
