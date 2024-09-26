
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"



function App() {

  return (
    <>
<div>
<Toaster />
  <Header/>
  <Outlet/>
</div>
    </>
  )
}

export default App
