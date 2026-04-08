import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Gọi API đăng nhập (dùng chung API với khách nhưng kiểm tra quyền ở đây)
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });

      // Dữ liệu từ authController trả về thường có dạng: { success, isAdmin, token, name, ... }
      const userData = res.data; 

      // 2. Kiểm tra quyền Admin (isAdmin phải là 1 hoặc true)
      if (userData.success && (userData.isAdmin === 1 || userData.isAdmin === true)) {
        
        // ✅ QUAN TRỌNG: Lưu đúng tên để ProtectedAdminRoute ở App.jsx đọc được
        localStorage.setItem('adminToken', userData.token);
        localStorage.setItem('user', JSON.stringify(userData)); 
        
        // 3. Chuyển hướng vào trang quản trị
        navigate('/admin/dashboard', { replace: true }); 
      } else {
        setError('❌ Tài khoản này không có quyền truy cập quản trị viên!');
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Sai email hoặc mật khẩu! Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', backgroundColor: '#f4f7fe'
    }}>
      <div style={{
        background: '#fff', padding: '40px', borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, color: '#FF6B00', fontSize: '28px', fontWeight: 'bold' }}>NEW SNEAKER</h2>
          <p style={{ color: '#888', marginTop: '5px', fontSize: '15px' }}>Hệ thống quản trị viên</p>
        </div>

        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', textAlign: 'center', border: '1px solid #ffcdd2' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold', fontSize: '14px' }}>EMAIL ADMIN</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@newsneaker.com"
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', outline: 'none', fontSize: '15px', transition: '0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold', fontSize: '14px' }}>MẬT KHẨU</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', outline: 'none', fontSize: '15px', transition: '0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#FF6B00'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', padding: '15px', 
              background: loading ? '#ccc' : '#2b3674', 
              color: '#fff', border: 'none', 
              borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s'
            }}
            onMouseOver={(e) => { if(!loading) e.target.style.background = '#FF6B00' }}
            onMouseOut={(e) => { if(!loading) e.target.style.background = '#2b3674' }}
          >
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP HỆ THỐNG'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
           <a href="http://localhost:5173" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>← Quay lại trang cửa hàng</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;