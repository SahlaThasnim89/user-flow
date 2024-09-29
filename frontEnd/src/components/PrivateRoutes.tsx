import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";


const PrivateRoutes = () => {
    const user=useSelector(selectUser)
  return user?<Outlet/>:<Navigate to='/login' replace/>
}

export default PrivateRoutes;