import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Đang xác thực...</div>;

  if (!user) {
    // Nếu chưa đăng nhập, đá về trang Login và nhớ trang cũ để sau khi login thì quay lại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;