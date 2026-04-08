import React from 'react';

export default function AddressForm({ addressData, setAddressData }) {
  // Hàm xử lý chung cho tất cả các ô Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ 
      ...addressData, 
      [name]: value 
    });
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>THÔNG TIN GIAO HÀNG</h3>
      
      {/* 👤 HỌ VÀ TÊN */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          name="fullName" 
          placeholder="Họ và tên người nhận" 
          value={addressData.fullName} // 👈 PHẢI CÓ DÒNG NÀY
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
          onChange={handleChange}
          required
        />
      </div>

      {/* 📞 SỐ ĐIỆN THOẠI */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          name="phone" 
          placeholder="Số điện thoại liên hệ" 
          value={addressData.phone} // 👈 PHẢI CÓ DÒNG NÀY
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
          onChange={handleChange}
          required
        />
      </div>

      {/* 🏠 ĐỊA CHỈ */}
      <div style={{ marginBottom: '5px' }}>
        <textarea 
          name="address" 
          placeholder="Địa chỉ chi tiết (Số nhà, tên đường, phường/xã...)" 
          value={addressData.address} // 👈 PHẢI CÓ DÒNG NÀY
          style={{ width: '100%', padding: '12px', height: '100px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', resize: 'none' }} 
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
        * Vui lòng kiểm tra kỹ thông tin để shipper liên lạc dễ dàng hơn.
      </p>
    </div>
  );
}