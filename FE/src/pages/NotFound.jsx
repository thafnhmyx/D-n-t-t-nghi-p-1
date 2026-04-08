import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="not-found-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        padding: '100px 20px'
      }}>
        {/* Con số 404 phong cách Sneaker */}
        <h1 style={{ 
          fontSize: '120px', 
          fontWeight: '900', 
          margin: 0, 
          color: '#eee',
          position: 'relative'
        }}>
          404
          <span style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            color: '#000',
            width: '100%'
          }}>
            ÚI! LẠC ĐƯỜNG RỒI
          </span>
        </h1>

        <p style={{ color: '#666', fontSize: '18px', marginTop: '20px', marginBottom: '40px' }}>
          Có vẻ như đôi giày bạn đang tìm kiếm đã "bay" mất hoặc địa chỉ này không tồn tại.
        </p>

        {/* Nút quay về trang chủ */}
        <Link 
          to="/" 
          style={{ 
            padding: '15px 40px', 
            background: '#FF6B00', 
            color: '#fff', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          QUAY VỀ TRANG CHỦ
        </Link>
      </main>

      <Footer />
    </div>
  );
}