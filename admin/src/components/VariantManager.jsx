import React, { useState } from 'react';

const VariantManager = ({ variants, onAddVariant, onUpdateQty }) => {
  // Đổi size_id thành size cho khớp với Backend
  const [newVar, setNewVar] = useState({ size: '', quantity: 0 });

  // Danh sách size cố định từ 39 đến 43
  const availableSizes = [39, 40, 41, 42, 43];

  // Xử lý khi bấm nút THÊM
  const handleAddClick = () => {
    if (!newVar.size) return alert("Vui lòng chọn size!");
    
    // TRUYỀN NGUYÊN OBJECT newVar LÊN CHA
    onAddVariant(newVar); 
    
    // Reset form nội bộ sau khi thêm
    setNewVar({ size: '', quantity: 0 }); 
  };

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginTop: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Quản lý Kho hàng</h3>
      
      {/* KHU VỰC CHỌN SIZE VÀ NHẬP SỐ LƯỢNG */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'flex-end', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', fontWeight: 'bold' }}>Kích thước (Size):</label>
          <select 
            value={newVar.size}
            onChange={(e) => setNewVar({...newVar, size: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: '#fff' }}
          >
            <option value="">Chọn size</option>
            {availableSizes.map(size => (
              <option key={size} value={size}>
                Size {size}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ width: '120px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', fontWeight: 'bold' }}>Số lượng:</label>
          <input 
            type="number" 
            placeholder="0"
            value={newVar.quantity}
            onChange={(e) => setNewVar({...newVar, quantity: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', textAlign: 'center' }} 
          />
        </div>

        <button 
          onClick={handleAddClick} 
          style={{ padding: '10px 25px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', height: '42px' }}
        >
          THÊM
        </button>
      </div>

      {/* BẢNG HIỂN THỊ DANH SÁCH SIZE VÀ SỐ LƯỢNG */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
            <th style={{ padding: '12px', color: '#555', borderBottom: '2px solid #ddd' }}>Kích thước</th>
            <th style={{ padding: '12px', color: '#555', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Số lượng tồn</th>
          </tr>
        </thead>
        <tbody>
          {variants?.map(v => (
            <tr key={v.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
              <td style={{ padding: '12px', fontWeight: '500' }}>
                Size {v.size}
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <input 
                  type="number" 
                  defaultValue={v.quantity} 
                  onBlur={(e) => onUpdateQty(v.id, e.target.value)}
                  style={{ 
                    width: '100px', 
                    padding: '8px', 
                    border: '1px solid #007bff', 
                    borderRadius: '4px', 
                    textAlign: 'center', 
                    color: '#007bff', 
                    fontWeight: 'bold' 
                  }}
                />
              </td>
            </tr>
          ))}
          {/* Hiển thị thông báo nếu chưa có variant nào. Lưu ý đổi colSpan xuống còn 2 */}
          {(!variants || variants.length === 0) && (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                Chưa có kích thước nào. Vui lòng thêm ở trên!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VariantManager;