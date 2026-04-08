/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// 1. Khởi tạo Context
export const AdminContext = createContext();

// 2. Component Provider chính
const AdminProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // State lưu trữ toàn bộ dữ liệu hệ thống Admin
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hàm kẹp Token vào Header để vượt qua các lớp bảo mật Backend
  const getConfig = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }, []);

  // 1. Lấy danh sách Sản phẩm
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/products?isAdmin=true`, getConfig());
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) { 
      console.error("Lỗi fetch sản phẩm:", err.message); 
    }
  }, [API_URL, getConfig]);

  // 2. Lấy Đơn hàng
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`, getConfig());
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) { 
      console.error("Lỗi fetch đơn hàng:", err.message); 
    }
  }, [API_URL, getConfig]);

  // 3. Lấy Khách hàng
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/users`, getConfig());
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) { 
      console.error("❌ Lỗi fetch khách hàng:", err.message); 
    }
  }, [API_URL, getConfig]);

  // 4. Lấy Thương hiệu & Danh mục (Đây là dữ liệu cho các ô Select/Dropdown)
  const fetchConfigData = useCallback(async () => {
    try {
      const [resBrand, resCate] = await Promise.all([
        axios.get(`${API_URL}/brands?isAdmin=true`, getConfig()).catch(e => { 
          console.error("Lỗi Brand API:", e.message); 
          return { data: [] }; 
        }), 
        axios.get(`${API_URL}/categories?isAdmin=true`, getConfig()).catch(e => { 
          console.error("Lỗi Cate API:", e.message); 
          return { data: [] }; 
        })
      ]);
      
      setBrands(Array.isArray(resBrand.data) ? resBrand.data : []);
      setCategories(Array.isArray(resCate.data) ? resCate.data : []);
    } catch (err) { 
      console.error("Lỗi tổng fetch Config:", err.message); 
    }
  }, [API_URL, getConfig]);

  // --- TỰ ĐỘNG LOAD KHI VÀO TRANG ---
  useEffect(() => {
    const loadAllData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      setLoading(true);
      await Promise.all([
        fetchProducts(), 
        fetchOrders(), 
        fetchUsers(), 
        fetchConfigData()
      ]);
      setLoading(false);
    };
    
    loadAllData();
  }, [fetchProducts, fetchOrders, fetchUsers, fetchConfigData]);

  const value = {
    products, fetchProducts,
    orders, fetchOrders,
    users, fetchUsers,
    brands, categories, fetchConfigData,
    loading,
    API_URL
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;