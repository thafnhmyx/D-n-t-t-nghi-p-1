import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const { products, fetchProducts, API_URL } = useContext(AdminContext);
  const navigate = useNavigate();
  
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL || 'http://localhost:5000/images';

  useEffect(() => { 
    fetchProducts(); 
  }, [fetchProducts]);

  // 👇 HÀM BẬT/TẮT ẨN HIỆN ĐÃ TỐI ƯU
  const handleToggleStatus = async (item) => {
    const isCurrentlyHidden = item.status === 'Hidden';
    const confirmMsg = isCurrentlyHidden 
      ? "Bạn muốn HIỆN LẠI sản phẩm này lên cửa hàng?" 
      : "Bạn muốn ẨN sản phẩm này khỏi khách hàng?";

    if (window.confirm(confirmMsg)) {
      try {
        // ✅ SỬA TẠI ĐÂY: Gọi đúng Route PATCH để đổi trạng thái
        // Đường dẫn này khớp với router.patch('/:id/toggle-status', ...) ở Backend
        await axios.patch(`${API_URL}/products/${item.id}/toggle-status`);
        
        fetchProducts(); // Tải lại danh sách để cập nhật giao diện
      } catch (err) {
        console.error("Lỗi đổi trạng thái:", err);
        alert("Không thể thay đổi trạng thái sản phẩm!");
      }
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
          <h2 style={{ margin: 0 }}>Quản lý sản phẩm</h2>
          <button 
            onClick={() => navigate('/admin/add-product')} 
            style={{ padding: '10px 20px', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + Thêm giày mới
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Ảnh</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Tên giày</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Giá</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.id} style={{ 
                borderBottom: '1px solid #eee',
                opacity: item.status === 'Hidden' ? 0.5 : 1, // Làm mờ nếu bị ẩn
                transition: '0.3s'
              }}>
                <td style={{ padding: '15px' }}>
                  <img 
                    src={`${IMAGE_URL}/${item.image}`} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/60x60?text=No+Image";
                    }}
                  />
                </td>
                <td style={{ fontWeight: '600' }}>
                  {item.name}
                  {item.status === 'Hidden' && (
                    <span style={{ marginLeft: '8px', color: '#dc3545', fontSize: '11px', fontWeight: 'bold' }}>
                      (ĐÃ ẨN)
                    </span>
                  )}
                </td>
                <td style={{ color: '#FF6B00', fontWeight: 'bold' }}>
                  {Number(item.price).toLocaleString('vi-VN')} đ
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => navigate(`/admin/product-variants/${item.id}`)} 
                    style={{ marginBottom: '5px', marginRight: '10px', color: '#28a745', border: '1px solid #28a745', background: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Kho (Size/Màu)
                  </button>
                  <br />
                  <button 
                    onClick={() => navigate(`/admin/edit-product/${item.id}`)} 
                    style={{ marginRight: '10px', color: '#007bff', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Sửa
                  </button>
                  
                  {/* NÚT BẬT/TẮT TRẠNG THÁI */}
<button 
  onClick={() => handleToggleStatus(item)} 
  style={{ 
    color: item.status === 'Hidden' ? '#28a745' : '#dc3545', // Đã ẩn thì hiện màu xanh, đang bán thì hiện màu đỏ
    border: 'none', 
    background: 'none', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    marginLeft: '10px'
  }}
>
  {item.status === 'Hidden' ? 'Hiện' : 'Ẩn'}
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;