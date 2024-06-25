import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { protectedRoutes } from '../views/public/PublicRoutes';
import { AuthProvider } from '../contexts/UserContext/AuthContext';
import PrivateRoute from '../views/private/PrivateRoutes';
import Login from '../components/main/login/Login';
import Register from '../components/main/register/Register';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            {protectedRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
