import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 👉 ĐÃ THÊM QUẢN LÝ BÀI VIẾT VÀO ĐÂY
  const menuItems = [
    { name: 'Trang quản lý', path: '/admin/dashboard', icon: '🏠' },
    { name: 'Quản lý sản phẩm', path: '/admin/products', icon: '👟' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders', icon: '🛍️' },
    { name: 'Quản lý người dùng', path: '/admin/users', icon: '👤' },
    { name: 'Quản lý thương hiệu', path: '/admin/brands', icon: '🅱️' },
    { name: 'Quản lý danh mục', path: '/admin/categories', icon: '📂' },
    { name: 'Quản lý bài viết', path: '/admin/posts', icon: '📰' }, 
  ];

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {
      // Xóa sạch Token và thông tin user
      localStorage.removeItem('adminToken');
      localStorage.removeItem('user');
      
      // Đẩy về trang Login của Admin
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div style={{ 
      width: '260px', 
      background: '#f8f9fa', 
      height: '100vh', 
      position: 'fixed', 
      borderRight: '1px solid #eee', 
      padding: '10px',
      display: 'flex',
      flexDirection: 'column', // Để đẩy nút đăng xuất xuống dưới
      boxSizing: 'border-box'
    }}>
      {/* PHẦN LOGO */}
      <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #ddd', marginBottom: '10px' }}>
         <strong style={{fontSize: '18px', color: '#FF6B00'}}>NEW SNEAKER</strong>
      </div>
      
      {/* DANH SÁCH MENU */}
      <div style={{ flex: 1 }}> {/* flex: 1 giúp phần này chiếm hết khoảng trống giữa */}
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} style={{
            display: 'flex', alignItems: 'center', padding: '12px 15px', color: '#444', textDecoration: 'none', borderRadius: '8px', marginBottom: '5px', fontSize: '15px',
            background: location.pathname.includes(item.path) ? '#e9ecef' : 'transparent',
            fontWeight: location.pathname.includes(item.path) ? 'bold' : 'normal',
            transition: 'all 0.2s'
          }}>
            <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span> 
            {item.name}
          </Link>
        ))}
      </div>

      {/* NÚT ĐĂNG XUẤT NẰM DƯỚI CÙNG */}
      <div style={{ padding: '15px 0', borderTop: '1px solid #eee' }}>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 15px',
            color: '#d32f2f', // Màu đỏ báo hiệu nguy hiểm/thoát
            background: 'transparent',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#fff5f5';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span style={{ marginRight: '12px', fontSize: '18px' }}>🚪</span> 
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;