/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// 1. Khởi tạo Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000/api";

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      if (res.data && (res.data.token || res.data.email || res.data._id)) {
        const userData = res.data;
        
        setUser(userData); 
        localStorage.setItem('user', JSON.stringify(userData));
        
        if (userData.isAdmin || userData.role === 'admin') {
          localStorage.setItem('adminToken', userData.token);
        }
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: "Phản hồi từ server không hợp lệ" 
        };
      }
    } catch (err) {
      console.error("Lỗi API Login:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Tài khoản hoặc mật khẩu không đúng" 
      };
    }
  };

  // --- PHẦN SỬA ĐỔI CHO KHÁCH HÀNG ---
  const logout = () => {
    // 1. Xóa sạch dữ liệu trong State và LocalStorage
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    
    // 2. Thông báo cho khách hàng
    alert("Bạn đã đăng xuất thành công. Hẹn gặp lại tại New Sneaker!");

    // 3. ĐIỀU HƯỚNG VỀ TRANG CHỦ (Thay vì trang login)
    // Việc về trang chủ giúp khách hàng vẫn có thể tiếp tục xem giày mà không bị ép login lại
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};