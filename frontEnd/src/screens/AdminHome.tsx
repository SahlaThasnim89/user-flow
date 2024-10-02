
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleUser } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const AdminHome = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); 

  

  useEffect(() => {
    if (user) {
        getUser();
    }
}, [user]);

  const getUser = async () => {
    try {
        const res = await axios.get('/api/admin/home');
        const userProfile = res.data;
        console.log(userProfile); 
        
        setCurrentUser(userProfile);
    } catch (error) {
        console.log(error.message);
        toast.error('Error fetching user data');
    }
};


  const getDashboard = async (e) => {
    try {
      navigate('/admin/userList');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Card className="mx-auto max-w-sm mt-28">
        <CardHeader>
          <CardTitle className="text-xl text-center">Welcome Admin</CardTitle>
          <CardDescription className='text-center'>
            Account Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center mb-4'>
            {user?.image ? (
              <img className="h-28 w-20 rounded-full" src={user.image} alt="User" />
            ) : (
              <CircleUser className="h-20 w-20" />
            )}
          </div>
          <h1 className='text-center font-semibold mt-6'>{user?.name}</h1>
          <h1 className='mt-1 mb-8 text-center font-normal'>{user?.email}</h1>

          <Button className="w-full" onClick={getDashboard}>
            Go to DashBoard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminHome;
