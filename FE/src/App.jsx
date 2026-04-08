import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import MyOrders from './pages/MyOrders';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetail from './pages/OrderDetail'; // 1. Nhớ import ở trên đầu

// 1. IMPORT 2 TRANG TIN TỨC VỪA TẠO VÀO ĐÂY
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/order-detail/:id" element={<OrderDetail />} />

      {/* 2. KHAI BÁO 2 ĐƯỜNG DẪN CHO TIN TỨC (Nằm trên trang bảo mật) */}
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetail />} />

      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Trang 404 luôn để ở cuối cùng */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}