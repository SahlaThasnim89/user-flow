import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '@/features/userSlice'
import axios from 'axios'
import { toast } from 'sonner'


const Header = () => {

  const user=useSelector(selectUser)
  console.log(user,'opopop');
  

  const navigate=useNavigate()
  const dispatch=useDispatch();
  
  const handleLogOut=async(e)=>{    
    const res=await axios.post('/api/logout')
    if(res.data.errors){
      toast.error('something went wrong'); 
    }else{
      dispatch(logout())
      toast.success('successfully logged out')
      navigate('/')
    }

  }

  
  return (
    <div>
              <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            
          <Package2
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
            <h1>MERN AUTH</h1>

          </Package2>
          
 
        </nav>
        <Sheet>
        
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
            
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
            
            <Package2
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
           
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
            <h1>MERN AUTH</h1>

          </Package2>
          <h1>MERN AUTH</h1>
             

            </nav>
          </SheetContent>
          <h1>MERN AUTH</h1>
        </Sheet>

        
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
    
          </form>
          { user?  (  <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e)=>handleLogOut(e)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> ) :(
                 
            <Link to='/login'>
            <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
                
            </TooltipTrigger>
        <TooltipContent>
          <p>Login</p>
        </TooltipContent>
      </Tooltip>
      </TooltipProvider>
   
              </Link>
            
         
         )}
        </div>
      </header>
    </div>
  )
}

export default Header