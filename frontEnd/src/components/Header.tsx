import React, { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/features/userSlice";
import axios from "axios";
import { toast } from "sonner";
// import { useLogoutMutation } from '@/features/usersApiSlice'

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation()

  // useEffect(()=>{
  //   if(user){
  //     navigate('/')
  //   }
  // },[user,navigate])

  // const [logoutApiCall]=useLogoutMutation()

  const handleLogOut = async (e) => {
    try {
      const res = await axios.post("/api/logout");
      if (res.data.errors) {
        toast.error("something went wrong");
      } else {
        // await logoutApiCall().unwrap();
        dispatch(logout());
        toast.success("successfully logged out");

        setTimeout(()=>{
          if(location.pathname.includes('/admin')){
            navigate('/admin/login')
          }else{
            navigate('/login')
          }
        },100)

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProfile = async (e) => {
    try {
      const res = await axios.get("/api/account");
      if (res.data.errors) {
        toast.error("something went wrong");
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <form className="ml-auto flex-1 sm:flex-initial"></form>
           {user && location.pathname.includes("/admin") ? (
            // If admin route, show only Logout button
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full bg-slate-900">
                <div className="rounded-full flex items-center justify-center">
                        <span className="text-white">A
                        </span>
                      </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => handleLogOut(e)}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ): user  ? (
            <div className="flex flex-row">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="rounded-full flex items-center justify-center">
                        <span>
                          {user.name
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase())
                            .join("")}
                        </span>
                      </div>
                    )}
                    {/* <CircleUser className="h-5 w-5" /> */}
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <Link to='/account'> */}
                  <DropdownMenuItem onClick={(e) => getProfile(e)}>
                    My Account
                  </DropdownMenuItem>
                  {/* </Link> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => handleLogOut(e)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/login">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
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
  );
};

export default Header;
