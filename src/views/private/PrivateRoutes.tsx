
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext/UserContext';

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" /> ;
};

export default PrivateRoute;
