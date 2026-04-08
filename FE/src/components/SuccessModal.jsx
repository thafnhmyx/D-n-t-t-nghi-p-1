import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessModal({ orderId, onClose }) {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
        <div style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }}>✔️</div>
        <h2 style={{ marginBottom: '10px' }}>ĐẶT HÀNG THÀNH CÔNG!</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Đơn hàng <strong style={{color: '#FF6B00'}}>#{orderId}</strong> của bạn đang được xử lý. Cảm ơn bạn đã tin tưởng Newsneaker!
        </p>
        <button 
          onClick={() => { onClose(); navigate('/'); }}
          style={{ width: '100%', padding: '14px', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          QUAY VỀ TRANG CHỦ
        </button>
      </div>
    </div>
  );
}