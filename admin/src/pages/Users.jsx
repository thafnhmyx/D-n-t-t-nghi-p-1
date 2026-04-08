import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Users = () => {
  const { users, fetchUsers, API_URL } = useContext(AdminContext);

  useEffect(() => { 
    if(fetchUsers) fetchUsers(); 
  }, [fetchUsers]);

  // Tìm admin duy nhất
  const adminUser = users?.find(u => u.isAdmin === 1);

  // Hàm xử lý khi chọn từ Menu xổ xuống
  const handleRoleChange = async (userId, newStatus) => {
    // Không cho phép chỉnh sửa admin duy nhất
    if (adminUser && userId === adminUser.id) {
      alert("⛔ Không thể chỉnh sửa admin duy nhất!");
      return;
    }

    const confirmMsg = newStatus === 1 
      ? "Xác nhận nâng cấp tài khoản này lên Quản trị viên?" 
      : "Xác nhận hạ quyền tài khoản này xuống Khách hàng?";
    
    if (window.confirm(confirmMsg)) {
      try {
        const token = localStorage.getItem('adminToken');
        const url = API_URL || 'http://localhost:5000/api';

        const response = await axios.put(`${url}/users/update-role/${userId}`, 
          { isAdmin: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          alert("Cập nhật vai trò thành công!");
          fetchUsers(); // Load lại danh sách
        }
      } catch (err) {
        console.error("🔥 Lỗi:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Không thể cập nhật quyền. Vui lòng kiểm tra lại Backend!");
      }
    }
  };

  return (
    <div style={{ padding: '30px', width: '100%', background: '#f8f9fa', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '20px' }}>Phân quyền người dùng</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Trạng thái hiện tại</th>
              <th>Thay đổi vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>#{user.id}</td>
                  <td style={{ fontWeight: 'bold' }}>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px',
                      background: user.isAdmin === 1 ? '#fff5f5' : '#f0fff4',
                      color: user.isAdmin === 1 ? '#e74c3c' : '#2ecc71',
                      border: `1px solid ${user.isAdmin === 1 ? '#e74c3c' : '#2ecc71'}`
                    }}>
                      {user.isAdmin === 1 ? 'Quản trị viên' : 'Khách hàng'}
                    </span>
                  </td>
                  <td>
                    {/* 👇 MENU XỔ XUỐNG DẠNG DỌC 👇 */}
                    {adminUser && user.id === adminUser.id ? (
                      <div style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e74c3c',
                        fontSize: '13px',
                        width: '160px',
                        backgroundColor: '#fff5f5',
                        color: '#e74c3c',
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>
                        🔒 Admin duy nhất
                      </div>
                    ) : (
                      <select 
                        value={user.isAdmin} 
                        onChange={(e) => handleRoleChange(user.id, parseInt(e.target.value))}
                        style={{
                          padding: '8px',
                          borderRadius: '6px',
                          border: '1px solid #ccc',
                          outline: 'none',
                          cursor: 'pointer',
                          fontSize: '13px',
                          width: '160px',
                          backgroundColor: '#fff'
                        }}
                      >
                        <option value={0}>👤 Khách hàng</option>
                        <option value={1}>🛡️ Quản trị viên</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>Đang tải...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;