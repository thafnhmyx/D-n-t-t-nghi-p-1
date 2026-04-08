import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function NewsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: '60px 20px', background: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontWeight: '900' }}>TẤT CẢ TIN TỨC</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {posts.map(post => (
          <a href={`/news/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit', background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <img src={`http://localhost:5000/images/${post.image}`} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <small style={{ color: '#007bff' }}>📅 {new Date(post.created_at).toLocaleDateString('vi-VN')}</small>
              <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{post.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.content}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}