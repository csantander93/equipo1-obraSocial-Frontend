import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { protectedRoutes } from '../views/public/ProtectedRoutes';
import { AuthProvider } from '../contexts/UserContext/AuthContext';
import PrivateRoutes from '../views/private/PrivateRoutes';
import Login from '../views/public/main/login/Login';
import Register from '../views/public/main/register/Register';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
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
