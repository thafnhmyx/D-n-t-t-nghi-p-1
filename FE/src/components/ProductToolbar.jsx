import React from 'react';

export default function ProductToolbar({ totalProducts, onSortChange, currentSort }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '30px', 
      background: '#fff', // Chuyển sang trắng cho sang trọng
      padding: '15px 0', // Bỏ padding ngang để thẳng hàng với lưới sản phẩm
      borderBottom: '1px solid #eee', // Thêm đường kẻ nhẹ bên dưới
      borderRadius: '0' 
    }}>
      {/* Hiển thị số lượng sản phẩm thực tế từ ProductGrid truyền lên */}
      <div style={{ color: '#888', fontSize: '14px' }}>
        Tìm thấy <strong style={{ color: '#000', fontWeight: '600' }}>{totalProducts || 0}</strong> sản phẩm
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>Sắp xếp theo:</label>
        <select 
          // Rất quan trọng: value={currentSort} giúp select tự nhảy về "Mới nhất" khi bạn bấm "Xóa bộ lọc"
          value={currentSort || 'newest'}
          onChange={(e) => onSortChange(e.target.value)}
          style={{ 
            padding: '8px 30px 8px 12px', // Tạo khoảng trống cho icon mũi tên mặc định
            borderRadius: '4px', 
            border: '1px solid #e0e0e0', 
            outline: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: '#fff',
            appearance: 'none', // Bỏ style mặc định của trình duyệt để tự custom
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ccc%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 8px center',
            backgroundSize: '16px'
          }}
        >
          <option value="newest">Mới nhất (Mặc định)</option>
          <option value="price-asc">Giá: Thấp đến Cao ↑</option>
          <option value="price-desc">Giá: Cao đến Thấp ↓</option>
        </select>
      </div>
    </div>
  );
}