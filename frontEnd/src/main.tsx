import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Home from './screens/Home.tsx'
import Login from './screens/Login.tsx'
import SignUp from './screens/SignUp.tsx'
import MyAccount from './screens/myAccount.tsx'
import { Provider } from 'react-redux';
import {store} from '../src/redux/store.tsx'
import EditUser from './screens/editUser.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import PrivateRoutes from './components/PrivateRoutes.tsx'



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>

        {/* privteRoutes */}
        <Route path='' element={<PrivateRoutes/>}>
        <Route path='/account' element={<MyAccount/>}/>
        <Route path='/editProfile' element={<EditUser/>}/>
        </Route>

    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
    <Provider store={store}> 
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
 </Provider>,
)
