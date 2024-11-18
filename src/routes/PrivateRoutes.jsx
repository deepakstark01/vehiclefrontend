import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../utils/utils';

const PrivateRoutes = () => {
 const { user, token } = useSelector(state => state.auth);
 // Get user data from local storage
 const localStorageData = getUser();

 // Check if authenticated
 const isAuthenticated = user || 
   (localStorageData && localStorageData.message === 'Login successful') ||
   (localStorageData && localStorageData.message === 'Updated Successful') || 
   token;

 return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;