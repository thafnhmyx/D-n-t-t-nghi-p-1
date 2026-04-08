import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Orders = () => {
  // Lấy các dữ liệu và hàm cần thiết từ AdminContext
  const { orders, fetchOrders, API_URL } = useContext(AdminContext);
  
  // ==========================================
  // 1. CÁC STATE QUẢN LÝ GIAO DIỆN VÀ DỮ LIỆU
  // ==========================================
  const [showModal, setShowModal] = useState(false);        // Trạng thái Đóng/Mở popup chi tiết
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu trữ thông tin đơn hàng đang được chọn
  const [orderDetails, setOrderDetails] = useState([]);     // Lưu trữ danh sách sản phẩm bên trong đơn hàng đó

  // Gọi hàm lấy danh sách đơn hàng ngay khi trang Admin vừa load xong
  useEffect(() => { 
    fetchOrders(); 
  }, [fetchOrders]);

  // ==========================================
  // 2. CÁC HÀM XỬ LÝ (HANDLERS)
  // ==========================================

  /**
   * Hàm xử lý khi bấm nút "Xem chi tiết"
   * Nhiệm vụ: Gọi API lấy dữ liệu chi tiết của đơn hàng và bật Popup lên
   */
  const handleShowDetail = async (order) => {
    try {
      const res = await axios.get(`${API_URL}/orders/${order.id}`);
      setOrderDetails(res.data); // Lưu danh sách sản phẩm lấy được vào state
      setSelectedOrder(order);   // Lưu thông tin khách hàng, tổng tiền...
      setShowModal(true);        // Bật popup lên
    } catch (err) {
      console.error("Lỗi lấy chi tiết:", err);
      alert("Không thể lấy thông tin chi tiết đơn hàng!");
    }
  };

  /**
   * Hàm xử lý khi thay đổi trạng thái đơn hàng (Đang xử lý / Đã giao / Đã hủy)
   */
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/orders/${orderId}/status`, { status: newStatus });
      alert("Cập nhật trạng thái thành công!");
      fetchOrders(); // Load lại danh sách đơn hàng để cập nhật màu sắc mới
    } catch (err) { 
      console.error("Lỗi cập nhật trạng thái:", err); 
      alert("Lỗi cập nhật!");
    }
  };

  // ==========================================
  // 3. GIAO DIỆN (RENDER)
  // ==========================================
  return (
    <div style={{ padding: '30px', background: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* KHUNG CHÍNH: BẢNG DANH SÁCH ĐƠN HÀNG */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '25px' }}>Quản lý đơn hàng khách hàng</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'center' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>#ST{order.id}</td>
                <td><strong>{order.fullname || 'Khách Vãng Lai'}</strong></td>
                <td>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                <td style={{ fontWeight: 'bold', color: '#FF6B00' }}>
                  {Number(order.total_money).toLocaleString()}đ
                </td>
                
                {/* CỘT TRẠNG THÁI (DROPDOWN) */}
                <td>
                  <select 
                    value={order.order_status || 'Pending'} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{ 
                      padding: '5px 10px', 
                      borderRadius: '20px', 
                      border: '1px solid #ddd', 
                      fontWeight: 'bold', 
                      outline: 'none',
                      // Đổi màu viền/chữ thẻ select theo trạng thái hiện tại
                      color: (order.order_status === 'Completed' || order.order_status === 'completed') ? '#28a745'
                           : (order.order_status === 'Cancelled' || order.order_status === 'cancelled') ? '#dc3545' : '#d9dc2f'
                    }}
                  >
                    {/* Ép cứng màu sắc và nền cho từng option để không bị lỗi hiển thị */}
                    <option value="Pending" style={{ color: '#d9dc2f', fontWeight: 'bold', background: '#fff' }}>Đang xử lý</option>
                    <option value="Completed" style={{ color: '#28a745', fontWeight: 'bold', background: '#fff' }}>Đã giao</option>
                    <option value="Cancelled" style={{ color: '#dc3545', fontWeight: 'bold', background: '#fff' }}>Đã hủy</option>
                  </select>
                </td>
                
                {/* CỘT NÚT THAO TÁC */}
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => handleShowDetail(order)}
                    style={{ 
                      padding: '8px 16px', background: '#007bff', color: '#fff', 
                      border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
                    }}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          POPUP (MODAL) HIỂN THỊ CHI TIẾT ĐƠN HÀNG 
          (Chỉ hiển thị khi showModal === true)
          ========================================== */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', width: '600px', borderRadius: '15px', padding: '30px', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            
            {/* Nút tắt Popup (Dấu X) */}
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}
            >✕</button>
            
            <h3 style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>
              Chi tiết đơn hàng #ST{selectedOrder?.id}
            </h3>
            
            {/* Box thông tin khách hàng */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '10px', fontSize: '14px' }}>
              <p style={{ margin: 0 }}><strong>Khách hàng:</strong> {selectedOrder?.fullname}</p>
              <p style={{ margin: 0 }}><strong>Điện thoại:</strong> {selectedOrder?.phone_number || selectedOrder?.phone || 'N/A'}</p>
              <p style={{ margin: 0, gridColumn: 'span 2' }}><strong>Địa chỉ:</strong> {selectedOrder?.address}</p>
            </div>

            {/* Bảng danh sách giày khách mua */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '10px 0' }}>Sản phẩm</th>
                  <th style={{ textAlign: 'center' }}>Size</th>
                  <th style={{ textAlign: 'center' }}>SL</th>
                  <th style={{ textAlign: 'right' }}>Giá</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails && orderDetails.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '12px 0' }}>{item.product_name}</td>
                    
                    {/* Cột Size làm nổi bật với màu cam */}
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ background: '#FF6B00', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                        {item.size}
                      </span>
                    </td>
                    
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{Number(item.price).toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tổng cộng đơn hàng */}
            <div style={{ marginTop: '20px', textAlign: 'right', paddingTop: '15px', borderTop: '2px solid #eee' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Tổng cộng: </span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF6B00' }}>
                {Number(selectedOrder?.total_money).toLocaleString()}đ
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;