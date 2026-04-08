import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      height: '500px',
      background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop") center/cover',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '50px', fontWeight: '900', marginBottom: '20px', letterSpacing: '2px' }}>
        NEW SNEAKER COLLECTION 2026
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '600px' }}>
        Khám phá những mẫu giày xu hướng nhất, cam kết chính hãng và dịch vụ tận tâm.
      </p>
      <button 
        onClick={() => navigate('/products')}
        style={{
          padding: '15px 40px',
          background: '#FF6B00',
          color: '#fff',
          border: 'none',
          borderRadius: '30px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: '0.3s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        MUA SẮM NGAY
      </button>
    </div>
  );
};

export default Banner;