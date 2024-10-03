
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

const MyAccount = () => {
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
        const res = await axios.get('/api/account');
        const userProfile = res.data;
        setCurrentUser(userProfile);
    } catch (error) {
        console.log('Error fetching user data',error);
    }
};


  const getProfileEditPage = async (e) => {
    try {
      navigate('/editProfile');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Card className="mx-auto max-w-sm mt-28">
        <CardHeader>
          <CardTitle className="text-xl text-center">My Account</CardTitle>
          <CardDescription className='text-center'>
            Account Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center mb-4'>
            {currentUser?.image ? (
              <img className="h-28 w-28 rounded-full" src={currentUser.image} alt="User" />
            ) : (
              <CircleUser className="h-20 w-20" />
            )}
          </div>
          <h1 className='text-center font-semibold mt-6'>{currentUser?.name}</h1>
          <h1 className='mt-1 text-center font-normal'>{currentUser?.email}</h1>
          <h2 className='mt-3 mb-8 text-center text-xs text-gray-400'>Created at: {new Date(currentUser?.createdTime).toLocaleString()}</h2>

          <Button className="w-full" onClick={getProfileEditPage}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyAccount;
