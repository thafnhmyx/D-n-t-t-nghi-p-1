import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Import các Components dùng chung
import Sidebar from './components/Sidebar';
import AdminHeader from './components/AdminHeader';

// Import các Trang (Pages)
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductVariants from './pages/ProductVariants';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Brands from './pages/Brands'; 
import Categories from './pages/Categories'; 
import AdminLogin from './pages/AdminLogin'; 

// 1. IMPORT TRANG QUẢN LÝ BÀI VIẾT VÀO ĐÂY
import PostManager from './pages/PostManager';

// ==========================================
// 1. CHỐT CHẶN BẢO VỆ
// ==========================================
const ProtectedAdminRoute = () => {
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || (user && user.isAdmin !== 1)) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

// ==========================================
// 2. LAYOUT ADMIN
// ==========================================
const AdminLayout = () => {
  return (
    <div className="admin-container" style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      <Sidebar />
      <div className="main-content" style={{ 
        flex: 1, 
        marginLeft: '260px', 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0 
      }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '25px', boxSizing: 'border-box' }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

// ==========================================
// 3. ROUTING
// ==========================================
function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="product-variants/:id" element={<ProductVariants />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="brands" element={<Brands />} />
          <Route path="categories" element={<Categories />} />

          {/* 2. KHAI BÁO ROUTE CHO QUẢN LÝ BÀI VIẾT */}
          {/* Vì nằm trong AdminLayout nên đường dẫn sẽ là: /admin/posts */}
          <Route path="posts" element={<PostManager />} />

        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;