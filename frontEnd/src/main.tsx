import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Home from './screens/Home.tsx'
import Login from './screens/Login.tsx'
import SignUp from './screens/SignUp.tsx'
import { Provider } from 'react-redux';
import {store} from '../src/redux/store.tsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<Home/>}/>
        <Route index={true} path='/login' element={<Login/>}/>
        <Route index={true} path='/register' element={<SignUp/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
 </Provider>,
  </StrictMode>,
)
