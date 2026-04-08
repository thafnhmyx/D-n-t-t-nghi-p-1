import React from 'react';

const AdminHeader = () => {
  return (
    <header style={{ 
      // 👇 ĐÃ SỬA: Bỏ marginLeft, dùng width 100% để nó sát mép Sidebar và mép phải
      width: '100%', 
      height: '60px', 
      background: '#fff', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 25px', 
      borderBottom: '1px solid #eee',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxSizing: 'border-box' // Đảm bảo padding không làm tràn chiều rộng
    }}>
      {/* Nút đóng mở menu (icon 3 gạch) */}
      <div style={{ cursor: 'pointer', fontSize: '20px', color: '#555', display: 'flex', alignItems: 'center' }}>
        ☰
      </div>

      {/* Thông tin Admin bên góc phải */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Admin Name</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Quản trị viên</p>
        </div>
        <div style={{ 
          width: '35px', 
          height: '35px', 
          background: '#f8f9fa', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          cursor: 'pointer',
          border: '1px solid #eee'
        }}>
          👤
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;