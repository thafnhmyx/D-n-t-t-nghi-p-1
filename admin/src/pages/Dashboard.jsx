import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const Dashboard = () => {
  const { products, orders } = useContext(AdminContext);

// 1. LOGIC DOANH THU CHUẨN: Tính tiền đơn "Completed" hoặc "Đã giao"
  const totalRevenue = orders.reduce((sum, order) => {
    // Bắt luôn cả tiếng Anh lẫn tiếng Việt cho khỏi trật đi đâu được
    if (order.order_status === 'Completed' || order.order_status === 'Đã giao') {
      return sum + (Number(order.total_money) || 0);
    }
    return sum; 
  }, 0);

  const cardStyle = {
    flex: 1,
    padding: '25px',
    borderRadius: '12px',
    color: '#fff',
    minWidth: '200px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{ padding: '30px', width: '100%', background: '#f8f9fa', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Bảng điều khiển hệ thống</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Thẻ Sản phẩm */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #FF6B00, #FF8E3C)' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>TỔNG SẢN PHẨM</p>
          <h2 style={{ margin: '10px 0 0', fontSize: '36px' }}>{products.length}</h2>
        </div>

        {/* Thẻ Tổng Đơn Hàng (Vẫn đếm đủ 81 đơn) */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>TỔNG ĐƠN HÀNG</p>
          <h2 style={{ margin: '10px 0 0', fontSize: '36px' }}>{orders.length}</h2>
        </div>

        {/* Thẻ Doanh thu */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #3498db, #2980b9)' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>TỔNG DOANH THU</p>
          <h2 style={{ margin: '10px 0 0', fontSize: '36px' }}>
            {totalRevenue.toLocaleString('vi-VN')} đ
          </h2>
        </div>
      </div>

      <div style={{ marginTop: '40px', background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>Thông báo hệ thống</h4>
        <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>
          Chào mừng Admin quay trở lại! Bạn có <strong style={{ color: '#FF6B00' }}>{orders.length}</strong> đơn hàng trong hệ thống.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;