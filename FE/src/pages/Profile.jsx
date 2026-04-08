import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' hoặc 'info'

  // 1. Lấy lịch sử đơn hàng từ Backend (orderController.js -> getOrdersByUser)
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          // BE cần API lấy đơn hàng theo ID người dùng
          const res = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
          setOrders(res.data);
          setLoading(false);
        } catch (err) {
          console.error("Lỗi lấy lịch sử đơn hàng:", err);
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (!user) return <div style={{ textAlign: 'center', padding: '100px' }}>Vui lòng đăng nhập để xem hồ sơ.</div>;

  return (
    <div className="profile-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />

      <main className="container" style={{ maxWidth: '1000px', margin: '50px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* CỘT TRÁI: MENU ĐIỀU HƯỚNG */}
          <div style={{ flex: '1 1 250px', background: '#fff', padding: '20px', borderRadius: '12px', height: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ width: '80px', height: '80px', background: '#FF6B00', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 15px', fontWeight: 'bold' }}>
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ margin: 0 }}>{user.username}</h3>
              <p style={{ color: '#888', fontSize: '14px' }}>{user.email}</p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li 
                onClick={() => setActiveTab('orders')}
                style={{ padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', background: activeTab === 'orders' ? '#fff0e6' : 'transparent', color: activeTab === 'orders' ? '#FF6B00' : '#333', fontWeight: activeTab === 'orders' ? 'bold' : 'normal', marginBottom: '5px' }}
              >
                📦 Đơn hàng của tôi
              </li>
              <li 
                onClick={() => setActiveTab('info')}
                style={{ padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', background: activeTab === 'info' ? '#fff0e6' : 'transparent', color: activeTab === 'info' ? '#FF6B00' : '#333', fontWeight: activeTab === 'info' ? 'bold' : 'normal', marginBottom: '5px' }}
              >
                👤 Thông tin cá nhân
              </li>
              <li 
                onClick={logout}
                style={{ padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', color: 'red', marginTop: '20px', borderTop: '1px solid #eee' }}
              >
                🚪 Đăng xuất
              </li>
            </ul>
          </div>

          {/* CỘT PHẢI: NỘI DUNG CHI TIẾT */}
          <div style={{ flex: '3 1 600px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            
            {activeTab === 'orders' ? (
              <>
                <h2 style={{ marginBottom: '25px' }}>Lịch sử đơn hàng</h2>
                {loading ? (
                  <p>Đang tải đơn hàng...</p>
                ) : orders.length === 0 ? (
                  <p style={{ color: '#888' }}>Bạn chưa có đơn hàng nào.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {orders.map(order => (
                      <div key={order.id} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontWeight: 'bold' }}>Mã đơn: #{order.id}</span>
                          <span style={{ 
                            padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                            background: order.status === 'Completed' ? '#e6f4ea' : '#fff4e5',
                            color: order.status === 'Completed' ? '#1e7e34' : '#b7791f'
                          }}>
                            {order.status === 'Completed' ? 'Đã giao' : 'Đang xử lý'}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Tổng tiền: <span style={{ color: '#FF6B00' }}>{order.total_price?.toLocaleString()}đ</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 style={{ marginBottom: '25px' }}>Thông tin cá nhân</h2>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '5px' }}>Tên người dùng</label>
                    <input type="text" value={user.username} disabled style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: '#f9f9f9' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '5px' }}>Địa chỉ Email</label>
                    <input type="email" value={user.email} disabled style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: '#f9f9f9' }} />
                  </div>
                  <button style={{ padding: '12px 25px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                    Cập nhật thông tin (Chưa hỗ trợ)
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}