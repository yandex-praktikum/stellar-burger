import { useSelector } from '../../services/store';
import { getUser } from '../../components/slices/userSlice';
import { Navigate, useLocation } from 'react-router';

export interface TProtectedProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute = ({ onlyUnAuth, children }: TProtectedProps) => {
  const location = useLocation();
  let user = useSelector(getUser);

  if (!onlyUnAuth && !user) {
    return <Navigate to='/register' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
