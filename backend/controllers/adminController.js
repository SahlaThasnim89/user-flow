import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { toast } from 'react-toastify'


//@desc Auth user/set token 
//route POST/api/login
//@access Public
const authAdmin=asyncHandler(async(req,res)=>{ 
    
    const credentials={
        email:'AdminSahla@gmail.com',
        password:'AdminSahla'
    }

    
    const {email,password}=req.body

        if(email===credentials.email&&password===credentials.password){
            
            const adminUser={
                _id:'admin123',
                name:'Admin',
                email:credentials.email,
            }
            
        generateToken(res,adminUser._id)
        res.status(201).json({
            _id:adminUser._id,
            name:adminUser.name,
            email:adminUser.email

        })
        
    }else{
        res.status(400);
        throw new Error('Invalid email or password')
    }

})



//@desc Logout user
//route POST/api/logout
//@access Public
const logoutAdmin=asyncHandler(async(req,res)=>{ 
try {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({message:'logged out'})
} catch (error) {
    res.status(400);
    throw new Error('failed logout')
}
})


const registerUser=asyncHandler(async(req,res)=>{ 
    const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const user=await User.create({
        name,
        email,
        password
    })
    
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
        
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }
     
})

//@desc get user
//route GET/api/users/profile
//@access Private





const getUsers=asyncHandler(async(req,res)=>{ 
    const users=await User.find()
    res.status(200).json(users)
})


const getSingleUser=asyncHandler(async(req,res)=>{      
    const id=req.params.id
    const user=await User.findOne({ _id: id }) 
    
    if(user){ 
        const userData={
            _id:user._id,
            name:user.name,
            email:user.email,
            image:user.image,
        }
        res.status(200).json(userData)
    }    
})


//@desc update user profile
//route PUT/api/users/profile
//@access Private
const updateUserProfile=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const user=await User.findOne({ _id: id }) 

    
    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        if(req.body.image){
            const image=req.body.image;
            user.image=image
        }
        const updatedUser=await user.save()
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            image: updatedUser.image,
        })   
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


const blockUser=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const user = await User.findById(id);
        if(user){
            user.isBlocked=req.body.isBlocked;;
            await user.save()
        res.status(200).json(user)    
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})




export {
    authAdmin,
    logoutAdmin,
    getUsers,
    updateUserProfile,
    registerUser,
    getSingleUser,
    blockUser
}