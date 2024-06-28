import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/UserContext/AuthContext';
import PrivateRoutes from '../views/private/PrivateRoutes';
import Login from '../views/public/main/login/Login';
import Register from '../views/public/main/register/Register';
import Home from '../views/private/home/Home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/*" element={<Home />} /> 
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
