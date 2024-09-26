import {z} from 'zod';


export const signUpSchema=z.object({
    email:z.string().email(),
    password:z.string().min(10,'Password must contain 10 charecters'),
    confirmPassword:z.string(),
  }).refine((data)=>data.password===data.confirmPassword,{
    message:"password must match",
    path:["confirmPassword"]
  })
  
  export type TsignUpSchema=z.infer<typeof signUpSchema>;

  export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(10,'Password must contain 10 charecters'),
  })
  
  export type TloginSchema=z.infer<typeof loginSchema>;