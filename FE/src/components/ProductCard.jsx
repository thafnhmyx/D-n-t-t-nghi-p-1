import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  
  const [showQuickSize, setShowQuickSize] = useState(false);
  const [variants, setVariants] = useState([]); // Lưu danh sách size thật từ DB
  const [loadingSizes, setLoadingSizes] = useState(false); // Trạng thái đang tải size

  // 1. KHI BẤM NÚT "THÊM VÀO GIỎ": Gọi API lấy size chuẩn từ kho
  const handleOpenQuickSize = async (e) => {
    e.preventDefault();
    setShowQuickSize(true);
    setLoadingSizes(true);

    try {
      // Gọi API lấy chi tiết sản phẩm để có variant_id và số lượng tồn kho mới nhất
      const res = await axios.get(`http://localhost:5000/api/products/${product.id}`);
      setVariants(res.data.variants || []);
    } catch (error) {
      console.error("Lỗi lấy sizes:", error);
      alert("Không thể tải danh sách size lúc này!");
      setShowQuickSize(false);
    } finally {
      setLoadingSizes(false);
    }
  };

  // 2. KHI BẤM CHỌN SIZE TRONG BẢNG MINI
  const handleQuickAdd = (e, variant) => {
    e.preventDefault(); 
    
    if (variant.quantity <= 0) {
      alert(`Xin lỗi, size ${variant.size} hiện đã hết hàng!`);
      return;
    }

    // ✅ ĐÓNG GÓI DỮ LIỆU CHUẨN 100% (Đã có variant_id thật để server trừ kho)
    const productToCart = {
      id: product.id,
      product_id: product.id,
      variant_id: variant.variant_id || variant.id, 
      product_variant_id: variant.variant_id || variant.id, 
      name: product.name,
      price: Number(product.price),
      image: product.image,
      selectedSize: variant.size,
      qty: 1
    };
    
    addToCart(productToCart);
    alert(`Đã thêm ${product.name} - Size ${variant.size} vào giỏ hàng!`);
    setShowQuickSize(false);
  };

  return (
    <div className="product-card" style={{ 
      border: '1px solid #f0f0f0', padding: '15px', borderRadius: '12px', 
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      background: '#fff', transition: 'all 0.3s ease'
    }}>
      
      {/* THÔNG TIN SẢN PHẨM */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img 
          src={`http://localhost:5000/images/${product.image}`} 
          alt={product.name} 
          style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
          onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=No+Image"; }}
        />
        <h4 style={{ 
          margin: '15px 0 10px', whiteSpace: 'nowrap', overflow: 'hidden', 
          textOverflow: 'ellipsis', fontSize: '16px', fontWeight: 'bold' 
        }}>
          {product.name}
        </h4>
        <p style={{ color: '#FF6B00', fontWeight: '900', fontSize: '18px' }}>
          {Number(product.price).toLocaleString('vi-VN')} đ
        </p>
      </Link>

      {/* NÚT THANH TOÁN / CHỌN SIZE NHANH */}
      {!showQuickSize ? (
        <button 
          onClick={handleOpenQuickSize}
          style={{ 
            width: '100%', padding: '12px', background: '#000', color: '#fff', 
            border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px',
            fontWeight: 'bold', fontSize: '14px', transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#333'}
          onMouseLeave={(e) => e.target.style.background = '#000'}
        >
          THÊM VÀO GIỎ
        </button>
      ) : (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#fff', padding: '15px 10px', borderTop: '2px solid #000',
          boxShadow: '0 -5px 15px rgba(0,0,0,0.1)', zIndex: 10,
          animation: 'slideUp 0.3s ease-out'
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>CHỌN SIZE NHANH:</p>
          
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {loadingSizes ? (
              <span style={{ fontSize: '13px', color: '#888' }}>Đang tải...</span>
            ) : variants.length > 0 ? (
              variants.map(variant => (
                <button
                  key={variant.id || variant.variant_id}
                  onClick={(e) => handleQuickAdd(e, variant)}
                  disabled={variant.quantity <= 0}
                  style={{
                    padding: '8px 12px', border: '1px solid #ccc',
                    background: variant.quantity <= 0 ? '#f5f5f5' : '#fff',
                    color: variant.quantity <= 0 ? '#ccc' : '#333',
                    cursor: variant.quantity <= 0 ? 'not-allowed' : 'pointer',
                    fontSize: '12px', borderRadius: '4px', fontWeight: 'bold',
                    transition: '0.2s'
                  }}
                  onMouseOver={(e) => { if(variant.quantity > 0) e.target.style.borderColor = '#000' }}
                  onMouseOut={(e) => { if(variant.quantity > 0) e.target.style.borderColor = '#ccc' }}
                >
                  {variant.size}
                </button>
              ))
            ) : (
              <span style={{ fontSize: '13px', color: 'red' }}>Đã hết hàng</span>
            )}
          </div>
          <button 
            onClick={() => setShowQuickSize(false)}
            style={{ 
              marginTop: '12px', background: 'none', border: 'none', 
              color: '#ff0000', fontSize: '11px', textDecoration: 'underline', 
              cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            Hủy bỏ
          </button>
        </div>
      )}

      {/* HIỆU ỨNG TRÌNH DIỄN */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .product-card:hover {
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}