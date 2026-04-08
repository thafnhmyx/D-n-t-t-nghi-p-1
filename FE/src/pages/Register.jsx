import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Kiểm tra khớp mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // 2. Gọi API đăng ký
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (res.data) {
        alert("Đăng ký thành công! Hãy đăng nhập để mua sắm.");
        navigate('/login');
      }
    } catch (err) {
      // ĐÃ THÊM DÒNG NÀY ĐỂ BẮT TẬN TAY LỖI TỪ BACKEND
      console.error("🔥 CHI TIẾT LỖI TỪ BACKEND:", err.response?.data || err.message);
      
      // Cải tiến phần hiển thị lỗi để lấy chính xác câu thông báo từ MySQL/Backend
      const backendError = err.response?.data?.error || err.response?.data?.message || "Lỗi đăng ký, vui lòng thử lại!";
      setError(backendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Header />

      <main style={{ maxWidth: '450px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginBottom: '10px' }}>ĐĂNG KÝ</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>Tham gia cộng đồng ShoesTrend ngay hôm nay!</p>

          {error && (
            <div style={{ background: '#fff2f2', color: '#d93025', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #ffcfcf' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Tên người dùng</label>
              <input 
                name="username" type="text" required placeholder="Ví dụ: NguyenVanA"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box' }}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Email</label>
              <input 
                name="email" type="email" required placeholder="example@gmail.com"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box' }}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Mật khẩu</label>
              <input 
                name="password" type="password" required placeholder="Tối thiểu 6 ký tự"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box' }}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Nhập lại mật khẩu</label>
              <input 
                name="confirmPassword" type="password" required placeholder="Nhập lại mật khẩu"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box' }}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" disabled={isSubmitting}
              style={{ 
                width: '100%', padding: '14px', background: isSubmitting ? '#ccc' : '#000', 
                color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', 
                cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '16px', transition: '0.3s' 
              }}
            >
              {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ NGAY'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            Đã có tài khoản? <Link to="/login" style={{ color: '#FF6B00', fontWeight: 'bold', textDecoration: 'none' }}>Đăng nhập</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}