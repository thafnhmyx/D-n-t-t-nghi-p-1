import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); 

  // 1. LẤY DỮ LIỆU VÀ TỰ ĐỘNG CHỌN SIZE MẶC ĐỊNH
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const fetchedProduct = res.data;
        
        setProduct(fetchedProduct);

        if (fetchedProduct && fetchedProduct.variants && fetchedProduct.variants.length > 0) {
          const availableVariant = fetchedProduct.variants.find(v => v.quantity > 0);
          if (availableVariant) {
            setSelectedSize(availableVariant.size);
          } else {
            setSelectedSize(fetchedProduct.variants[0].size);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Lỗi lấy chi tiết sản phẩm:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Lấy ra số lượng tồn kho của size đang được chọn
  const currentVariant = product?.variants?.find(v => v.size == selectedSize);
  const currentStock = currentVariant ? currentVariant.quantity : 0;

  // 2. XỬ LÝ SỐ LƯỢNG (BẤM NÚT & GÕ PHÍM)
  const handleIncrease = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn size trước!");
      return;
    }
    if (quantity >= currentStock) {
      alert(`Số lượng tồn kho không đủ! Chỉ còn ${currentStock} đôi.`);
      return;
    }
    setQuantity(prev => Number(prev) + 1);
  };

  const handleDecrease = () => {
    setQuantity(prev => (Number(prev) > 1 ? Number(prev) - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setQuantity('');
      return;
    }
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      if (currentStock > 0 && parsed > currentStock) {
        alert(`Số lượng tồn kho không đủ! Chỉ còn ${currentStock} đôi.`);
        setQuantity(currentStock); 
      } else {
        setQuantity(parsed);
      }
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  // 3. LOGIC THÊM VÀO GIỎ HÀNG / MUA NGAY
  const handleAddToCartLogic = (shouldNavigate = false) => {
    if (!selectedSize) {
      alert("Vui lòng chọn size giày trước khi mua!");
      return;
    }

    if (!currentVariant) {
      alert("Size này hiện không khả dụng!");
      return;
    }

    if (currentVariant.quantity <= 0) {
      alert(`Xin lỗi, size ${selectedSize} hiện đã hết hàng!`);
      return;
    }

    const finalQuantity = Number(quantity) || 1;

    if (finalQuantity > currentVariant.quantity) {
      alert(`Kho chỉ còn ${currentVariant.quantity} đôi cho size này!`);
      setQuantity(currentVariant.quantity);
      return;
    }

    const productToCart = {
      id: product.id,                 
      product_id: product.id,         
      variant_id: currentVariant.variant_id || currentVariant.id, 
      product_variant_id: currentVariant.variant_id || currentVariant.id, 
      name: product.name,
      price: Number(product.price),
      image: product.image,
      selectedSize: selectedSize,
      qty: finalQuantity      
    };

    console.log("🛒 Đang gửi vào CartContext:", productToCart);
    addToCart(productToCart);

    if (shouldNavigate) {
      navigate('/cart');
    } else {
      alert(`Đã thêm ${finalQuantity} đôi giày size ${selectedSize} vào giỏ hàng!`);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px' }}>Đang tải thông tin giày...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px' }}>Không tìm thấy sản phẩm!</div>;

  return (
    <div className="product-detail-page" style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="container" style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          
          {/* CỘT TRÁI: HÌNH ẢNH */}
          <div style={{ flex: '1 1 450px' }}>
            <div style={{ border: '1px solid #f0f0f0', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fafafa', padding: '20px' }}>
              <img 
                src={`http://localhost:5000/images/${product.image}`} 
                alt={product.name} 
                style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: '500px' }} 
              />
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
          <div style={{ flex: '1 1 400px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '15px', textTransform: 'uppercase' }}>{product.name}</h1>
            <p style={{ fontSize: '28px', color: '#FF6B00', fontWeight: '900', marginBottom: '25px' }}>
              {Number(product.price).toLocaleString('vi-VN')} đ
            </p>

            {/* PHẦN CHỌN SIZE */}
            <div style={{ marginBottom: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '16px' }}>CHỌN SIZE:</h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {product.variants && product.variants.map((variant) => (
                  <button
                    key={variant.variant_id || variant.id} 
                    onClick={() => {
                      setSelectedSize(variant.size);
                      // 👉 Đã chuyển logic ép số lượng về 1 vào đây, an toàn tuyệt đối
                      if (quantity > variant.quantity) {
                        setQuantity(1);
                      }
                    }}
                    disabled={variant.quantity <= 0}
                    style={{
                      minWidth: '65px', height: '48px',
                      border: selectedSize == variant.size ? '2px solid #000' : '1px solid #ddd',
                      background: variant.quantity <= 0 ? '#f5f5f5' : (selectedSize == variant.size ? '#000' : '#fff'),
                      color: variant.quantity <= 0 ? '#ccc' : (selectedSize == variant.size ? '#fff' : '#333'),
                      borderRadius: '10px', 
                      cursor: variant.quantity <= 0 ? 'not-allowed' : 'pointer', 
                      fontWeight: 'bold', fontSize: '15px', transition: 'all 0.2s'
                    }}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* HIỂN THỊ SỐ LƯỢNG TỒN KHO */}
            {product.variants && (
              <p style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>
                Còn lại trong kho: {currentStock} đôi
              </p>
            )}

            {/* PHẦN CHỌN SỐ LƯỢNG */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '35px' }}>
              <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>SỐ LƯỢNG:</h4>
              <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                <button onClick={handleDecrease} style={{ padding: '10px 18px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '18px', borderRight: '1px solid #ddd' }}>-</button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={handleQuantityChange}
                  onBlur={handleQuantityBlur}
                  style={{ width: '60px', textAlign: 'center', border: 'none', fontSize: '16px', fontWeight: 'bold', outline: 'none' }}
                />
                <button onClick={handleIncrease} style={{ padding: '10px 18px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '18px', borderLeft: '1px solid #ddd' }}>+</button>
              </div>
            </div>

            {/* NÚT MUA HÀNG */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => handleAddToCartLogic(false)} 
                style={{ 
                    flex: 1, 
                    padding: '18px', 
                    background: '#fff', 
                    color: '#000', 
                    border: '2px solid #000', 
                    fontWeight: '900', 
                    borderRadius: '12px', 
                    cursor: 'pointer', 
                    fontSize: '15px', 
                    fontFamily: "'Tahoma', sans-serif", 
                    textTransform: 'uppercase'
                }}
              >
                THÊM VÀO GIỎ
              </button>
              
              <button 
                onClick={() => handleAddToCartLogic(true)} 
                style={{ 
                    flex: 1, 
                    padding: '18px', 
                    background: '#000', 
                    color: '#fff', 
                    border: 'none', 
                    fontWeight: '900', 
                    borderRadius: '12px', 
                    cursor: 'pointer', 
                    fontSize: '15px', 
                    fontFamily: "'Tahoma', sans-serif",
                    textTransform: 'uppercase'
                }}
              >
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}