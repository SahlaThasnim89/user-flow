import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
const port =process.env.PORT||8000;
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js';
connectDB();
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js'

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/',userRoutes)
app.use('/api/admin',adminRoutes)

app.get('/',(req,res)=>{
    res.send('hello')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`Server statrted on port ${port}`))