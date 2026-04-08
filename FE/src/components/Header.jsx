import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <header style={{ 
      borderBottom: '1px solid #eee', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
    }}>
      {/* 1. THANH TOPBAR ĐEN (Thông tin liên hệ & Tài khoản) */}
      <div style={{ 
        background: '#000', 
        color: '#fff', 
        padding: '10px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontSize: '13px' 
      }}>
        <span>Hotline: 088 656 9966</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user ? (
            <>
              <span style={{ color: '#FF6B00', fontWeight: 'bold' }}>
                👋 Chào, {user?.name || user?.username || user?.full_name || "Thành viên"}
              </span>
              
              {/* NÚT ĐƠN HÀNG - Dẫn về trang 5 Tab quản lý đơn */}
              <Link to="/my-orders" style={{ color: '#fff', textDecoration: 'none', borderLeft: '1px solid #444', paddingLeft: '15px' }}>
                📦 ĐƠN HÀNG
              </Link>

              <button 
                onClick={logout} 
                style={{ 
                  background: 'none', 
                  color: '#ff4d4f', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                ĐĂNG XUẤT
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
              ĐĂNG NHẬP / ĐĂNG KÝ
            </Link>
          )}
        </div>
      </div>

      {/* 2. THANH NAVIGATION CHÍNH (Logo & Menu) */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '15px 5%', 
        alignItems: 'center' 
      }}>
        {/* LOGO */}
        <Link to="/" style={{ 
          fontSize: '26px', 
          fontWeight: '900', 
          textDecoration: 'none', 
          color: '#000', 
          letterSpacing: '1px' 
        }}>
          NEW <span style={{ color: '#FF6B00' }}>SNEAKER</span>
        </Link>

        {/* MENU ĐIỀU HƯỚNG */}
        <ul style={{ 
          display: 'flex', 
          gap: '35px', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          <li><Link to="/" style={{ textDecoration: 'none', color: '#000', transition: '0.3s' }}>TRANG CHỦ</Link></li>
          <li><Link to="/products" style={{ textDecoration: 'none', color: '#000' }}>SẢN PHẨM</Link></li>
          
          {/* MỤC TIN TỨC / BÀI VIẾT */}
          <li><Link to="/news" style={{ textDecoration: 'none', color: '#000' }}>TIN TỨC</Link></li>
          
          <li><Link to="/about" style={{ textDecoration: 'none', color: '#000' }}>GIỚI THIỆU</Link></li>
        </ul>

        {/* ICON GIỎ HÀNG */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div 
            style={{ position: 'relative', cursor: 'pointer' }} 
            onClick={() => navigate('/cart')}
          >
            <span style={{ fontSize: '24px' }}>🛒</span>
            {cartItems.length > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-10px', 
                background: '#FF6B00', 
                color: '#fff', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontSize: '11px', 
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}