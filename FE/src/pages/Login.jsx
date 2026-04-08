import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Lấy trang mà khách đang xem trước khi bị ép đăng nhập (ví dụ: giỏ hàng)
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      // ✅ THÊM THÔNG BÁO THÀNH CÔNG
      alert("Đăng nhập thành công! Chào mừng bạn đến với New Sneaker.");
      
      // ✅ ĐIỀU HƯỚNG VỀ TRANG CŨ HOẶC TRANG CHỦ
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Email hoặc mật khẩu không chính xác');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, maxWidth: '450px', width: '100%', margin: '60px auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <h2 style={{ textAlign: 'center', fontWeight: '800', fontSize: '28px', marginBottom: '10px', letterSpacing: '-1px' }}>ĐĂNG NHẬP</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px', fontSize: '14px' }}>Chào mừng bạn quay trở lại với New Sneaker!</p>

          {error && (
            <div style={{ background: '#fff2f2', color: '#d93025', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', textAlign: 'center', border: '1px solid #ffcfcf', animation: 'shake 0.2s ease-in-out 0s 2' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px', color: '#333' }}>EMAIL</label>
              <input 
                ref={emailInputRef}
                type="email" 
                required 
                placeholder="example@gmail.com"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box', transition: 'border 0.3s' }}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => e.target.style.border = '1px solid #FF6B00'}
                onBlur={(e) => e.target.style.border = '1px solid #ddd'}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '13px', color: '#333' }}>MẬT KHẨU</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', boxSizing: 'border-box', transition: 'border 0.3s' }}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => e.target.style.border = '1px solid #FF6B00'}
                onBlur={(e) => e.target.style.border = '1px solid #ddd'}
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: '25px' }}>
              <Link to="/forgot-password" style={{ fontSize: '13px', color: '#FF6B00', textDecoration: 'none', fontWeight: '500' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                Quên mật khẩu?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                width: '100%', padding: '14px', 
                background: isSubmitting ? '#ccc' : '#000', 
                color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', 
                cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '15px', transition: '0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => { if(!isSubmitting) e.target.style.background = '#333' }}
              onMouseOut={(e) => { if(!isSubmitting) e.target.style.background = '#000' }}
            >
              {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            Bạn chưa có tài khoản? <Link to="/register" style={{ color: '#FF6B00', fontWeight: 'bold', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Đăng ký ngay</Link>
          </div>
        </div>
      </main>

      <Footer />
      
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}