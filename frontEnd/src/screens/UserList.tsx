import React, { useEffect, useState } from "react";
import { PlusCircle, Search, UserRoundPen, UserRoundX, UserRoundCheck} from "lucide-react";
import { UserRound } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const UserList = () => {
  const [users, setUsers] = useState(null);
  const [blocked,setBlocked]=useState(new Set())
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [user]);

  const getUsers = async (e) => {
    try {
      const res = await axios.get("/api/admin/usersList");
      if (res.data.errors) {
        toast.error("something went wrong");
      } else {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCreatePage = async (e) => {
    try {
      navigate("/admin/createUser");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getEditPage = async (e, id) => {
    try {
      navigate(`/admin/editUser/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const BlockUser = async (e, id,isBlocked) => {
    try {
      const res = await axios.patch(`/api/admin/deleteUser/${id}`,{
        isBlocked:!isBlocked,
      });

      const updatedUser = res.data;
      setUsers((prevUsers) => 
        prevUsers.map((user) => 
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      setBlocked((prev)=>{
        const updated=new Set(prev)
        if(isBlocked){
          updated.delete(id)
      }else{
        updated.add(id)
      }
      return updated
    })

    const action = isBlocked ? "User unblocked successfully" : "User blocked successfully";
    toast(action);    
  }catch (error) {
      console.error("Error deleting user :", error);
      toast("action failed");
    }
  };


  const FilterUser = users?.filter((user) => {
    const creationTime = new Date(user.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creationTime.includes(searchQuery)
    );
  });

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="">Users</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-8 gap-1"
                    onClick={getCreatePage}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add User
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                      Manage your Users and view their Details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            Image
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>email</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Edit
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Block
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {FilterUser?.length > 0 ? (
                          FilterUser?.map((user) => (
                            <TableRow key={user._id}>
                              <TableCell className="hidden sm:table-cell">
                                {user.image ? (
                                  <img
                                    alt="User image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={user.image}
                                    width="64"
                                  />
                                ) : (
                                  <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-16 w-16 rounded-md flex items-center justify-center"
                                  >
                                    <UserRound className="h-8 w-8" />
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>

                              <TableCell className="hidden md:table-cell">
                                {user.email}
                              </TableCell>

                              <TableCell className="hidden md:table-cell">
                                {new Date(user.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </TableCell>
                              <TableCell>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full"
                                        onClick={(e) =>
                                          getEditPage(e, user._id)
                                        }
                                      >
                                        <UserRoundPen className="h-5 w-5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>edit user</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>

                              <TableCell>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            variant="secondary"
                                            size="icon"
                                            className="rounded-full"
                                          >
                                            {user.isBlocked ? (
                                              <UserRoundCheck className="h-5 w-5" />
                                            ) : (
                                              <UserRoundX className="h-5 w-5" />
                                            )}

                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                            Please confirm: this action will affect their access. Do you want to proceed?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={(e) =>
                                                BlockUser(e, user._id,user.isBlocked)
                                              }
                                            >
                                              Continue
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <p>{user.isBlocked ? "Unblock user" : "Block user"}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              No users found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserList;
