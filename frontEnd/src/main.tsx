import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Home from './screens/Home.tsx'
import Login from './screens/Login.tsx'
import SignUp from './screens/SignUp.tsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<Home/>}/>
        <Route index={true} path='/auth' element={<Login/>}/>
        <Route index={true} path='/register' element={<SignUp/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
