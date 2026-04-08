import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Tất cả đơn');
  const [loading, setLoading] = useState(true);

  const tabs = ['Tất cả đơn', 'Đang xử lý', 'Đang vận chuyển', 'Đã giao hàng', 'Đã hủy'];

  // 1. Lấy danh sách đơn hàng từ Server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id || savedUser?.id;
        
        if (!userId) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
        const data = res.data.orders || res.data; 
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy đơn hàng:", err);
        setOrders([]);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  // 2. Logic lọc đơn hàng theo Tab
  const filteredOrders = orders.filter(order => {
    const status = order.order_status;
    if (activeTab === 'Tất cả đơn') return true;
    
    if (activeTab === 'Đang xử lý') {
      return status === 'Pending' || status === 'Processing';
    }
    
    if (activeTab === 'Đang vận chuyển') {
      return status === 'Shipping';
    }

    if (activeTab === 'Đã giao hàng') {
      // Hiện cả đơn 'Delivered' và 'Completed' (Hoàn thành)
      return status === 'Delivered' || status === 'Completed' || status === 'Hoàn thành';
    }

    if (activeTab === 'Đã hủy') {
      return status === 'Cancelled';
    }
    
    return true;
  });

  // 3. Hàm chuyển đổi trạng thái sang Tiếng Việt hiển thị
  const getStatusTextInVietnamese = (status) => {
    switch(status) {
      case 'Pending': 
      case 'Processing': return 'ĐANG XỬ LÝ';
      case 'Shipping': return 'ĐANG VẬN CHUYỂN';
      case 'Delivered': return 'ĐÃ GIAO HÀNG';
      case 'Completed':
      case 'Hoàn thành': return 'HOÀN THÀNH'; 
      case 'Cancelled': return 'ĐÃ HỦY';
      default: return status?.toUpperCase() || 'ĐANG XỬ LÝ';
    }
  };

  return (
    <div style={{ background: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        
        {/* THANH TAB ĐIỀU HƯỚNG */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: '8px 8px 0 0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          {tabs.map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, textAlign: 'center', padding: '15px 0', cursor: 'pointer',
                fontSize: '15px', fontWeight: activeTab === tab ? 'bold' : '500',
                color: activeTab === tab ? '#e67e22' : '#555',
                borderBottom: activeTab === tab ? '3px solid #e67e22' : '3px solid transparent',
                transition: '0.3s'
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Ô TÌM KIẾM ĐƠN HÀNG */}
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <input 
            type="text" 
            placeholder="Tìm đơn hàng theo mã đơn hàng hoặc tên sản phẩm" 
            style={{ width: '100%', padding: '15px 20px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '14px' }}
          />
          <button style={{ position: 'absolute', right: '20px', top: '15px', border: 'none', background: 'none', color: '#e67e22', fontWeight: 'bold', cursor: 'pointer' }}>
            Tìm đơn hàng
          </button>
        </div>

        {/* DANH SÁCH ĐƠN HÀNG HIỂN THỊ */}
        <div style={{ marginTop: '25px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Đang tải đơn hàng của bạn...</p>
          ) : filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '8px' }}>
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" width="100" alt="Empty" style={{ opacity: 0.5 }} />
              <p style={{ color: '#999', marginTop: '15px' }}>Chưa có đơn hàng nào ở trạng thái này.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} style={{ background: '#fff', borderRadius: '8px', padding: '25px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {/* Header đơn hàng: Ngày và Trạng thái */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5', paddingBottom: '15px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '13px', color: '#888' }}>
                    Ngày đặt: {new Date(order.created_at).toLocaleDateString('vi-VN')}
                  </span>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                     <span style={{ color: '#e67e22', fontSize: '12px', fontWeight: 'bold' }}>
                        🚚 {getStatusTextInVietnamese(order.order_status)}
                     </span>
                     <span style={{ height: '15px', width: '1px', background: '#ddd' }}></span>
                     <span style={{ color: order.payment_status === 'Paid' ? '#52c41a' : '#ff4d4f', fontWeight: 'bold', fontSize: '12px' }}>
                       {order.payment_status === 'Paid' ? 'ĐÃ THANH TOÁN' : 'CHỜ THANH TOÁN'}
                     </span>
                  </div>
                </div>

                {/* Nội dung đơn hàng */}
                <div style={{ display: 'flex', gap: '20px' }}>
                  <img 
                    src={order.image ? `http://localhost:5000/images/${order.image}` : 'https://via.placeholder.com/100?text=Giay'} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f0f0f0' }} 
                    alt="Sản phẩm" 
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
                      {order.product_name || 'Đơn hàng New Sneaker'}
                    </h3>
                    <p style={{ margin: '0', color: '#888', fontSize: '14px' }}>Mã đơn hàng: <span style={{ color: '#333', fontWeight: 'bold' }}>#{order.id}</span></p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>Số lượng: <span style={{ fontWeight: 'bold' }}>x{order.total_quantity || 1}</span></p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#e67e22', fontSize: '20px', fontWeight: '900', margin: '5px 0' }}>
                      {Number(order.total_money).toLocaleString()}đ
                    </div>
                    <button style={{ background: '#e67e22', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                      Chi tiết đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;