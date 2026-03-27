import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';

interface PrivateRouteProps {
    element: ReactNode;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState)=> state.userAuth.userAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]); 


  if (!isAuthenticated) {
    return <Loader/>
  }

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;