import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc Auth user/set token 
//route POST/api/login
//@access Public
const authUser=asyncHandler(async(req,res)=>{ 
    const {email,password}=req.body
    const user=await User.findOne({email:email})
    if(user&&(await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isBlocked:user.isBlocked,
        })
    }else{
        res.status(400).json('Invalid email or password');
        throw new Error('Invalid email or password')
    }
})

//@desc Register a new user
//route POST/api/users
//@access Public
const registerUser=asyncHandler(async(req,res)=>{ 
    const {name,email,password}=req.body
    console.log(name,email,password); 
    const userExists=await User.findOne({email})
    if(userExists){
        console.log('user already have')
        res.status(400).json({message:'User already exists'})
        
    }
    const user=await User.create({
        name,
        email,
        password,
    })
    console.log(user,'user')
    
    
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
        
    }else{
        res.status(400).json('Invalid user data');

    }
     
})


//@desc Logout user
//route POST/api/logout
//@access Public
const logoutUser=asyncHandler(async(req,res)=>{ 
try {

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    
    res.status(200).json({message:'User logout'})
} catch (error) {
    res.status(400);
    throw new Error('failed logout')
}
})

//@desc get user
//route GET/api/users/profile
//@access Private


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('name email image isBlocked createdAt');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        createdTime: user.createdAt,
        isBlocked:user.isBlocked,
    };
    

    res.status(200).json(userProfile);
});


//@desc update user profile
//route PUT/api/users/profile
//@access Private
const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id) 
    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;
        if(req.body.password){
            user.password=req.body.password
        }
        if (req.body.image) {
            user.image = req.body.image; 
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




export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}