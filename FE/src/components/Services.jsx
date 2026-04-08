import React from 'react';

const Services = () => {
  const items = [
    { icon: '🚚', title: 'Miễn Phí Vận Chuyển', desc: 'Cho đơn hàng trên 1 triệu' },
    { icon: '🛡️', title: 'Bảo Hành Chính Hãng', desc: 'Đổi trả trong vòng 30 ngày' },
    { icon: '💬', title: 'Hỗ Trợ 24/7', desc: 'Tư vấn nhiệt tình tận tâm' },
    { icon: '💳', title: 'Thanh Toán An Toàn', desc: 'Hỗ trợ VNPAY & COD' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '50px 20px', background: '#f9f9f9' }}>
      {items.map((item, index) => (
        <div key={index} style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>{item.icon}</div>
          <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.title}</h4>
          <p style={{ fontSize: '14px', color: '#777' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;