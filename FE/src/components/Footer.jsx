import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '50px 5% 20px', marginTop: '50px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '20px' }}>NEW SNEAKER</h3>
          <p style={{ color: '#888', lineHeight: '1.6', fontSize: '14px' }}>
            Chúng tôi mang đến những đôi giày chất lượng và phong cách nhất cho cộng đồng yêu Sneaker tại Việt Nam.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px' }}>LIÊN KẾT</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px' }}>
            <li style={{ marginBottom: '10px' }}><Link to="/products" style={{ color: '#888', textDecoration: 'none' }}>Sản phẩm</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/about" style={{ color: '#888', textDecoration: 'none' }}>Về chúng tôi</Link></li>
            
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px' }}>HỖ TRỢ</h4>
          <p style={{ color: '#888', fontSize: '14px' }}>Hotline: 088 656 9966</p>
          <p style={{ color: '#888', fontSize: '14px' }}>Email: newsneaker@gmail.com</p>
          <p style={{ color: '#888', fontSize: '14px' }}>Địa chỉ: Q12, TP. Hồ Chí Minh</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #333', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        © 2026 Newsneaker - All Rights Reserved.
      </div>
    </footer>
  );
}