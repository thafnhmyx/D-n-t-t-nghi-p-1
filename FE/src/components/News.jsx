import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy tin tức:", err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="news-section" style={{ padding: '40px 20px', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto 30px' }}>
        <h3 style={{ margin: 0, fontWeight: 'bold' }}>TIN TỨC MỚI NHẤT</h3>
        
        <Link to="/news" style={{ color: '#e67e22', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
          Xem thêm →
        </Link>
      </div>
      
      {loading ? (
        <p>Đang tải tin tức...</p>
      ) : posts.length === 0 ? (
        <p>Đang cập nhật các xu hướng Sneaker mới nhất từ hệ thống...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
          {posts.map(post => (
            
            <Link 
              to={`/news/${post.id}`} 
              key={post.id} 
              style={{ 
                border: '1px solid #eee', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                textDecoration: 'none', 
                color: 'inherit',       
                display: 'block',       
                transition: 'transform 0.2s',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={`http://localhost:5000/images/${post.image}`} 
                alt={post.title} 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px' }}>
                <small style={{ color: '#007bff', display: 'block', marginBottom: '10px' }}>
                  📅 {new Date(post.created_at).toLocaleDateString('vi-VN')}
                </small>
                <h4 style={{ margin: '0 0 10px', lineHeight: '1.4', color: '#333' }}>{post.title}</h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </p>
              </div>
            </Link>

          ))}
        </div>
      )}
    </div>
  );
};

export default News;