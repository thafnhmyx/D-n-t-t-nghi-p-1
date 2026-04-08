import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. GỌI API LẤY DANH SÁCH BÀI VIẾT TỪ BACKEND
useEffect(() => {
    // Định nghĩa hàm ngay bên trong useEffect để React không bắt bẻ nữa
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []); // Bây giờ mảng rỗng [] này sẽ hoàn toàn xanh mượt

  // 2. HÀM XỬ LÝ NÚT XÓA (Tạm thời báo alert, lát nữa mình viết API Backend sẽ chạy thật)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      alert(`Đã nhận lệnh xóa bài viết ID: ${id}. Mình sẽ nối API xóa ở bước tiếp theo nhé!`);
      // Sau này sẽ thêm dòng: await axios.delete(`http://localhost:5000/api/posts/${id}`);
      // fetchPosts(); // Load lại bảng sau khi xóa
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      
      {/* KHU VỰC TIÊU ĐỀ VÀ NÚT THÊM MỚI */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '2px solid #eee' }}>
        <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>Quản Lý Bài Viết</h2>
        <button 
          onClick={() => alert('Chức năng thêm bài viết sẽ chuyển sang trang Form thêm mới!')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#FF6B00', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            fontSize: '15px',
            boxShadow: '0 4px 6px rgba(255, 107, 0, 0.2)'
          }}
        >
          + Thêm bài viết mới
        </button>
      </div>

      {/* BẢNG HIỂN THỊ DỮ LIỆU */}
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eaeaea', color: '#555' }}>
              <th style={{ padding: '15px 20px', width: '50px' }}>ID</th>
              <th style={{ padding: '15px 20px', width: '100px' }}>Hình ảnh</th>
              <th style={{ padding: '15px 20px' }}>Tiêu đề</th>
              <th style={{ padding: '15px 20px', width: '150px' }}>Ngày đăng</th>
              <th style={{ padding: '15px 20px', textAlign: 'center', width: '150px' }}>Thao tác</th>
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                  ⏳ Đang tải dữ liệu...
                </td>
              </tr>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fcfcfc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '15px 20px', fontWeight: 'bold', color: '#666' }}>#{post.id}</td>
                  
                  <td style={{ padding: '15px 20px' }}>
                    <img 
                      src={`http://localhost:5000/images/${post.image}`} 
                      alt="cover" 
                      style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' }} 
                    />
                  </td>
                  
                  <td style={{ padding: '15px 20px', fontWeight: '600', color: '#333', lineHeight: '1.4' }}>
                    {post.title}
                  </td>
                  
                  <td style={{ padding: '15px 20px', color: '#777', fontSize: '14px' }}>
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  
                  <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                    <button 
                      onClick={() => alert('Chức năng sửa sẽ load dữ liệu cũ lên form!')}
                      style={{ padding: '8px 12px', marginRight: '8px', backgroundColor: '#e3f2fd', color: '#1976d2', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      style={{ padding: '8px 12px', backgroundColor: '#ffebee', color: '#d32f2f', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '16px' }}>
                  📭 Chưa có bài viết nào! Bấm nút "Thêm bài viết mới" để tạo bài đầu tiên nhé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}