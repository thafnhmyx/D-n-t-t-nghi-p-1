import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async (e) => {
    e.preventDefault(); 
    if (!email) return setError("Vui lòng nhập Email!");

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Gửi yêu cầu reset mật khẩu lên Backend
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      
      setMessage("Hệ thống đã gửi hướng dẫn về Email của bạn. Vui lòng kiểm tra hộp thư!");
      setEmail(''); 
    } catch (err) {
      setError(err.response?.data?.message || "Email không tồn tại hoặc lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Header />
      
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px' }}>
        <div style={{ maxWidth: '400px', width: '100%', padding: '35px', background: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', borderRadius: '15px', textAlign: 'center' }}>
          
          <h2 style={{ marginBottom: '15px', fontWeight: '800', letterSpacing: '-0.5px' }}>QUÊN MẬT KHẨU?</h2>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
            Nhập email của bạn để chúng tôi hỗ trợ cấp lại mật khẩu mới.
          </p>

          {/* Thông báo Thành công */}
          {message && (
            <div style={{ color: '#2e7d32', background: '#e8f5e9', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', border: '1px solid #c8e6c9' }}>
              ✅ {message}
            </div>
          )}
          
          {/* Thông báo Lỗi */}
          {error && (
            <div style={{ color: '#d32f2f', background: '#ffebee', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', border: '1px solid #ffcdd2' }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSendRequest}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px', color: '#333' }}>EMAIL ĐÃ ĐĂNG KÝ</label>
              <input 
                type="email" 
                value={email}
                required
                placeholder="example@gmail.com" 
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', padding: '13px', borderRadius: '8px', 
                  border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box',
                  fontSize: '14px', transition: '0.3s' 
                }}
                onFocus={(e) => e.target.style.border = '1px solid #FF6B00'}
                onBlur={(e) => e.target.style.border = '1px solid #ddd'}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', padding: '14px', 
                background: loading ? '#ccc' : '#000', 
                color: '#fff', border: 'none', borderRadius: '8px', 
                fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', 
                fontSize: '15px', transition: '0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => { if(!loading) e.target.style.background = '#333' }}
              onMouseOut={(e) => { if(!loading) e.target.style.background = '#000' }}
            >
              {loading ? 'ĐANG XỬ LÝ...' : 'GỬI YÊU CẦU'}
            </button>
          </form>

          <div style={{ marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <a href="/login" style={{ color: '#FF6B00', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>
              ← Quay lại đăng nhập
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}