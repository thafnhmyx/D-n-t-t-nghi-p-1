import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function ProductGrid({ filters, onFetch }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Số sản phẩm trên 1 trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setCurrentPage(1); // ✅ Reset về trang 1 mỗi khi lọc sản phẩm mới

        // Gửi tham số lọc lên Backend
        const res = await axios.get('http://localhost:5000/api/products', { 
          params: filters 
        });
        
        const data = res.data.products || res.data;
        const finalData = Array.isArray(data) ? data : [];
        
        setProducts(finalData);
        
        // ✅ CẬP NHẬT SỐ LƯỢNG: Báo về file cha ngay cả khi là mảng rỗng
        if (onFetch) onFetch(finalData.length);

      } catch (err) {
        console.error("🔥 Lỗi lấy sản phẩm từ API:", err.message);
        setProducts([]);
        // ✅ NẾU LỖI: Báo về số lượng là 0 để Toolbar không bị sai số
        if (onFetch) onFetch(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Sử dụng JSON.stringify để React nhận diện thay đổi của object filters chính xác nhất
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]); 

  // --- LOGIC TÍNH TOÁN PHÂN TRANG ---
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Cắt mảng sản phẩm ra để lấy đúng những sản phẩm của trang hiện tại
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // 1. Trạng thái Loading
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: '#888', width: '100%' }}>
        <div style={{ 
          width: '40px', height: '40px', 
          border: '3px solid #f3f3f3', borderTop: '3px solid #333', 
          borderRadius: '50%', margin: '0 auto 15px',
          animation: 'spin 1s linear infinite' 
        }}></div>
        <p>Đang tìm giày cho bạn...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // 2. Trạng thái Rỗng (Không có sản phẩm)
  if (products.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '80px 20px', 
        background: '#fcfcfc', 
        borderRadius: '12px',
        border: '1px dashed #ddd',
        width: '100%',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>👟❓</div>
        <h3 style={{ color: '#333', marginBottom: '10px' }}>Không tìm thấy sản phẩm</h3>
        <p style={{ color: '#888', marginBottom: '20px' }}>Thử chọn danh mục hoặc thương hiệu khác để xem thêm nhiều giày hơn nhé!</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{ 
            padding: '10px 25px', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            border: '1px solid #333',
            background: '#fff',
            fontWeight: '600',
            transition: '0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
          onMouseOut={(e) => e.target.style.background = '#fff'}
        >
          Xóa tất cả bộ lọc
        </button>
      </div>
    );
  }

  // 3. Hiển thị danh sách sản phẩm & Phân trang
  return (
    <>
      <style>
        {`
          @keyframes fadeInGrid {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      {/* Grid sản phẩm - Đã sửa dùng currentProducts để phân trang */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
        gap: '25px',
        animation: 'fadeInGrid 0.6s ease-out' 
      }}>
        {currentProducts.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {/* Hệ thống nút phân trang */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', paddingBottom: '30px' }}>
          
          <button 
            onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={currentPage === 1}
            style={{ padding: '8px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: '1px solid #ddd', background: '#fff', borderRadius: '4px', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Đầu
          </button>

          {[...Array(totalPages).keys()].map(number => (
            <button 
              key={number + 1} 
              onClick={() => { setCurrentPage(number + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                padding: '8px 15px',
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === number + 1 ? '#000' : '#fff', 
                color: currentPage === number + 1 ? '#fff' : '#000',
                fontWeight: 'bold',
                transition: '0.3s'
              }}
            >
              {number + 1}
            </button>
          ))}

          <button 
            onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={currentPage === totalPages}
            style={{ padding: '8px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: '1px solid #ddd', background: '#fff', borderRadius: '4px', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Sau
          </button>
          
        </div>
      )}
    </>
  );
}