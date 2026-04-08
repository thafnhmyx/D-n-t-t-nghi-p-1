import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy bài viết:", err);
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '20px', color: '#888', fontWeight: 'bold' }}>
        <span style={{ marginRight: '10px' }}>⏳</span> Đang tải bài viết...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontSize: '20px', color: '#ff4d4f', fontWeight: 'bold' }}>
        Không tìm thấy bài viết này!
      </div>
    );
  }

  return (
    /* LỚP NỀN: Màu xám nhạt phủ toàn màn hình để làm nổi khối bài viết */
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh', 
      padding: '50px 20px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
    }}>
      
      {/* KHỐI BÀI VIẾT: Tựa như một tờ giấy trắng nổi lên */}
      <div style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        backgroundColor: '#fff', 
        borderRadius: '24px', 
        padding: '50px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.04)' 
      }}>
        
        {/* NÚT QUAY LẠI: Làm dạng Badge (nút bấm) cực kỳ hiện đại */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            padding: '10px 20px',
            borderRadius: '30px',
            color: '#333', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '35px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e4e6e9'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f0f2f5'; }}
        >
          <span style={{ marginRight: '8px', fontSize: '16px' }}>←</span> Quay lại trang chủ
        </Link>

        {/* TAG DANH MỤC */}
        <div style={{ color: '#FF6B00', textTransform: 'uppercase', fontWeight: '800', fontSize: '13px', letterSpacing: '1.5px', marginBottom: '15px' }}>
          TIN TỨC SNEAKER
        </div>

        {/* TIÊU ĐỀ: Phóng to, in đậm, line-height hẹp lại cho gọn */}
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: '900', 
          color: '#111', 
          lineHeight: '1.2', 
          marginBottom: '20px',
          letterSpacing: '-1px'
        }}>
          {post.title}
        </h1>
        
        {/* THÔNG TIN PHỤ (Meta) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px', 
          color: '#888', 
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '40px',
          paddingBottom: '25px',
          borderBottom: '2px solid #f0f0f0' 
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>🕒</span> {new Date(post.created_at).toLocaleDateString('vi-VN')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>✍️</span> Admin
          </span>
        </div>
        
        {/* ẢNH COVER: Bo góc mềm mại, đổ bóng nhẹ */}
        <div style={{ marginBottom: '45px' }}>
          <img 
            src={`http://localhost:5000/images/${post.image}`} 
            alt={post.title} 
            style={{ 
              width: '100%', 
              maxHeight: '550px', 
              objectFit: 'cover',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }} 
          />
        </div>
        
        {/* NỘI DUNG CHÍNH: Màu chữ xám đen cho dịu mắt, khoảng cách dòng rộng */}
        <div style={{ 
          fontSize: '18px',     
          lineHeight: '2',    
          color: '#444', 
          textAlign: 'left', // Bỏ justify đi vì nó hay làm khoảng cách chữ bị rỗ
          whiteSpace: 'pre-wrap', 
          letterSpacing: '0.2px'
        }}>
          {post.content}
        </div>

      </div>
    </div>
  );
}