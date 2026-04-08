import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Dùng cái này chuyển trang cho mượt

// Import các Components cùng cấp trong thư mục components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Services from '../components/Services';
import ProductCard from '../components/ProductCard';
import News from '../components/News';

export default function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Khởi tạo hook chuyển trang

  // 1. Lấy danh sách sản phẩm mới nhất từ Backend
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        
        // TỐI ƯU: Chỉ cắt lấy đúng 8 sản phẩm đầu tiên để hiển thị ở Trang Chủ
        const data = res.data.products || res.data;
        setNewProducts(data.slice(0, 8)); 
        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm trang chủ:", err);
        setLoading(false);
      } 
    };
    fetchNewProducts();
  }, []);

  return (
    <div className="home-page">
      <Header />
      
      {/* Phần Banner Quảng cáo */}
      <Banner />

      {/* Phần 3 cam kết dịch vụ (Vận chuyển, đổi trả...) */}
      <Services />

      <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Tiêu đề phần Sản phẩm mới */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Sản Phẩm Mới Nhất
          </h2>
          <div style={{ width: '60px', height: '3px', background: '#FF6B00', margin: '10px auto' }}></div>
        </div>

        {/* Lưới hiển thị sản phẩm */}
        {loading ? (
          <p style={{ textAlign: 'center' }}>Đang tải sản phẩm...</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '30px' 
          }}>
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Nút Xem tất cả */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            // TỐI ƯU: Dùng navigate để chuyển trang kiểu React (không bị load lại trắng trang)
            onClick={() => navigate('/products')} 
            style={{ 
              padding: '12px 35px', 
              background: 'none', 
              border: '2px solid #000', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseOver={(e) => { e.target.style.background = '#000'; e.target.style.color = '#fff'; }}
            onMouseOut={(e) => { e.target.style.background = 'none'; e.target.style.color = '#000'; }}
          >
            XEM TẤT CẢ SẢN PHẨM
          </button>
        </div>

        {/* Phần Tin tức / Bài viết */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>TIN TỨC MỚI</h2>
          </div>
          <News />
        </div>

      </main>

      <Footer />
    </div>
  );
}