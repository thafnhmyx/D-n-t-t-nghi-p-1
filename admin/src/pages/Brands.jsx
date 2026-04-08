import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Brands = () => {
  // Lấy dữ liệu từ AdminContext
  const { brands, fetchConfigData, API_URL } = useContext(AdminContext);
  const [name, setName] = useState('');

// 1. Tự động load dữ liệu khi vào trang
  useEffect(() => {
    if (fetchConfigData) {
      fetchConfigData();
    }
  }, [fetchConfigData]); // <--- Thêm fetchConfigData vào đây để hết lỗi vàng

  // 2. Hàm lấy Config (Token) để gửi request
  const getConfig = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  // 3. Hàm thêm thương hiệu mới
  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      // Đảm bảo API_URL/brands khớp với index.js
      const response = await axios.post(`${API_URL}/brands`, { name: name.trim() }, getConfig());
      
      if (response.data.success) {
        fetchConfigData(); // Tải lại danh sách hãng
        setName(''); // Xóa ô input
        alert("✅ Thêm thương hiệu thành công!");
      }
    } catch (err) { 
      console.error("Lỗi khi thêm thương hiệu:", err); 
      alert("Lỗi kết nối Server hoặc dữ liệu không hợp lệ!");
    }
  };

  // 4. Hàm Bật/Tắt ẩn hiện thương hiệu
  const handleToggleStatus = async (id, currentStatus) => {
    const confirmMsg = currentStatus === 'Hidden' 
      ? "Bạn muốn HIỆN LẠI thương hiệu này?" 
      : "Bạn có chắc muốn ẨN thương hiệu này?";

    if (window.confirm(confirmMsg)) {
      try {
        // Sử dụng id (viết thường) để khớp với database của bạn
        const response = await axios.patch(`${API_URL}/brands/${id}/toggle-status`, {}, getConfig());
        
        if (response.data.success) {
          fetchConfigData(); // Cập nhật lại giao diện
        }
      } catch (err) {
        console.error("Lỗi đổi trạng thái thương hiệu:", err);
        alert("Không thể thay đổi trạng thái!");
      }
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ 
        background: '#fff', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
        maxWidth: '700px',
        margin: '0 auto' 
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Quản lý Thương hiệu</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ 
              flex: 1, 
              padding: '12px 15px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              outline: 'none',
              fontSize: '14px'
            }} 
            placeholder="Tên hãng mới (Nike, Adidas...)" 
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button 
            onClick={handleAdd} 
            style={{ 
              background: '#FF6B00', 
              color: '#fff', 
              border: 'none', 
              padding: '0 25px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold'
            }}
          >
            + Thêm
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left', color: '#888', fontSize: '14px' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Tên hãng</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Trạng thái</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {brands && brands.length > 0 ? (
              brands.map(b => (
                <tr key={b.id} style={{ 
                  borderBottom: '1px solid #eee',
                  opacity: b.status === 'Hidden' ? 0.5 : 1, 
                  transition: '0.3s'
                }}>
                  <td style={{ padding: '15px', color: '#999', width: '60px' }}>#{b.id}</td>
                  
                  <td style={{ padding: '15px', fontWeight: '600', color: '#333' }}>
                    {b.name || b.Name}
                  </td>

                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      background: b.status === 'Hidden' ? '#fdecea' : '#e6f7ed',
                      color: b.status === 'Hidden' ? '#d93025' : '#1e8e3e',
                      fontWeight: 'bold'
                    }}>
                      {b.status === 'Hidden' ? 'Đang ẩn' : 'Hiển thị'}
                    </span>
                  </td>

                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleToggleStatus(b.id, b.status)}
                      style={{ 
                        color: b.status === 'Hidden' ? '#28a745' : '#dc3545', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '13px',
                        fontWeight: 'bold'
                      }}
                    >
                      {b.status === 'Hidden' ? 'Hiện lại' : 'Ẩn đi'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                  Chưa có dữ liệu hãng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Brands;