import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Categories = () => {
  // Bỏ API_URL ở đây ra, tự khai báo bên dưới cho chắc chắn
  const { categories, fetchConfigData } = useContext(AdminContext);
  const [name, setName] = useState('');

  // Tự động chốt cứng đường dẫn tới Backend
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const getAuthConfig = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  useEffect(() => {
    if (fetchConfigData) {
      fetchConfigData();
    }
  }, [fetchConfigData]);

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Bạn chưa nhập tên danh mục kìa!");
      return;
    }
    
    try {
      // Gửi cả 'name' và 'Name' để bao phòng hờ Backend của bạn yêu cầu chữ hoa hay chữ thường
      const payload = { name: name, Name: name }; 
      
      console.log("Đang gửi dữ liệu:", payload, "đến", `${API_URL}/categories`);
      
      await axios.post(`${API_URL}/categories`, payload, getAuthConfig());
      
      if (fetchConfigData) fetchConfigData(); 
      setName(''); 
      alert("✅ Thêm danh mục thành công!");
      
    } catch (err) { 
      console.error("🔥 Chi tiết lỗi thêm:", err);
      // Hiển thị lỗi rõ ràng hơn để dễ sửa
      alert("❌ Lỗi: " + (err.response?.data?.message || err.message || "Không thể kết nối Backend"));
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Hidden' ? 'Available' : 'Hidden';
    const confirmMsg = newStatus === 'Hidden' 
      ? "Bạn có chắc muốn ẨN danh mục này?" 
      : "Bạn muốn HIỆN LẠI danh mục này?";

    if (window.confirm(confirmMsg)) {
      try {
        await axios.patch(`${API_URL}/categories/${id}/toggle-status`, {}, getAuthConfig());
        if (fetchConfigData) fetchConfigData(); 
      } catch (err) {
        console.error("Chi tiết lỗi đổi trạng thái:", err);
        alert("Lỗi khi thay đổi trạng thái danh mục!");
      }
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Quản lý Danh mục</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '14px' }} 
            placeholder="Tên loại giày mới (VD: Chạy bộ, Sneakers)..." 
          />
          <button 
            onClick={handleAdd} 
            style={{ background: '#3498db', color: '#fff', border: 'none', padding: '0 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + Thêm
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left', color: '#888', fontSize: '14px' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Tên danh mục</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Trạng thái</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map(c => (
                <tr key={c.Id || c.id} style={{ borderBottom: '1px solid #eee', opacity: c.status === 'Hidden' ? 0.5 : 1, transition: '0.3s' }}>
                  <td style={{ padding: '15px', color: '#999', width: '60px' }}>#{c.Id || c.id}</td>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#333' }}>{c.Name || c.name}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: c.status === 'Hidden' ? '#fdecea' : '#e6f7ed', color: c.status === 'Hidden' ? '#d93025' : '#1e8e3e' }}>
                      {c.status === 'Hidden' ? 'Đang ẩn' : 'Hiển thị'}
                    </span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleToggleStatus(c.Id || c.id, c.status)}
                      style={{ color: c.status === 'Hidden' ? '#28a745' : '#dc3545', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                    >
                      {c.status === 'Hidden' ? 'Hiện lại' : 'Ẩn đi'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>Chưa có danh mục nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;