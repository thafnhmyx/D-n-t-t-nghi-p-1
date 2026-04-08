import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext'; 

export default function Cart() {
  const { cartItems, removeFromCart, addToCart, totalPrice, setCartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const IMAGE_BASE_URL = "http://localhost:5000/images/";

  const handleClearAll = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi giỏ hàng không?")) {
      clearCart();
    }
  };

  const handleDecrease = (id, selectedSize, currentQty) => {
    if (currentQty > 1) {
      updateQtyLogic(id, selectedSize, currentQty - 1);
    } else {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?")) {
        removeFromCart(id, selectedSize);
      }
    }
  };

  const handleInputChange = (id, selectedSize, value) => {
    if (value === "") {
      updateQtyLogic(id, selectedSize, ""); 
    } else {
      const num = parseInt(value);
      if (num > 0) {
        updateQtyLogic(id, selectedSize, num);
      }
    }
  };

  // 👉 ĐÃ SỬA: Tìm kiếm an toàn bằng variant_id hoặc id
  const updateQtyLogic = (id, selectedSize, newQty) => {
    const updatedCart = cartItems.map(item => 
      ((item.variant_id || item.id) === id && item.selectedSize === selectedSize) 
        ? { ...item, qty: newQty } 
        : item
    );
    setCartItems(updatedCart);
  };

  const handleBlur = (id, selectedSize, currentQty) => {
    if (currentQty === "" || currentQty < 1) {
      updateQtyLogic(id, selectedSize, 1);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ marginBottom: '20px' }}>Giỏ hàng của bạn đang trống!</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>Hãy chọn cho mình những đôi giày ưng ý nhất nhé.</p>
          <Link to="/products" style={{ 
            padding: '15px 40px', background: '#000', color: '#fff', 
            textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px' 
          }}>QUAY LẠI CỬA HÀNG</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <main className="container" style={{ maxWidth: '1200px', margin: '50px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>GIỎ HÀNG CỦA BẠN</h1>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '2 1 600px' }}>
            
            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
              <button 
                onClick={handleClearAll}
                style={{
                  background: 'none', border: 'none', color: '#d32f2f', 
                  cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
                }}
              >
                🗑️ Xóa toàn bộ giỏ hàng
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}> 
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ paddingBottom: '15px', width: '40%' }}>Sản phẩm</th>
                  <th style={{ paddingBottom: '15px', width: '20%' }}>Giá</th>
                  <th style={{ paddingBottom: '15px', textAlign: 'center', width: '20%' }}>Số lượng</th>
                  <th style={{ paddingBottom: '15px', textAlign: 'right', width: '20%' }}>Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  // 👉 ĐÃ SỬA: Tạo ID chuẩn bất chấp nút nào được bấm
                  const currentId = item.variant_id || item.id; 

                  return (
                    <tr key={`${currentId}-${item.selectedSize}`} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img 
                          src={`${IMAGE_BASE_URL}${item.image}`} 
                          alt={item.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} 
                          onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=No+Image"; }}
                        />
                        <div style={{ overflow: 'hidden' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                          {item.selectedSize && (
                            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#666' }}>Size: {item.selectedSize}</p>
                          )}
                        </div>
                      </td>
                      <td style={{ fontSize: '15px' }}>{Number(item.price).toLocaleString()}đ</td>
                      
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' }}>
                          {/* Sửa lại ID truyền vào các hàm */}
                          <button 
                            onClick={() => handleDecrease(currentId, item.selectedSize, item.qty)} 
                            style={{ padding: '5px 8px', border: 'none', background: 'none', cursor: 'pointer' }}
                          >-</button>

                          <input 
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleInputChange(currentId, item.selectedSize, e.target.value)}
                            onBlur={() => handleBlur(currentId, item.selectedSize, item.qty)}
                            style={{ 
                              width: '40px', textAlign: 'center', border: 'none', 
                              outline: 'none', fontSize: '13px', fontWeight: 'bold', padding: 0
                            }}
                          />

                          <button 
                            onClick={() => addToCart(item)} 
                            style={{ padding: '5px 8px', border: 'none', background: 'none', cursor: 'pointer' }}
                          >+</button>
                        </div>
                      </td>

                      <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: '#333', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100px' }}>
                        {(item.price * (Number(item.qty) || 0)).toLocaleString()}đ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '12px', position: 'sticky', top: '20px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>TÓM TẮT ĐƠN HÀNG</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>Tạm tính:</span>
                <span style={{ fontWeight: 'bold', textAlign: 'right', wordBreak: 'break-all', marginLeft: '10px', flex: 1 }}>
                  {Number(totalPrice).toLocaleString()}đ
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>Phí vận chuyển:</span>
                <span style={{ color: '#4CAF50' }}>Miễn phí</span>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '15px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 'bold' }}>TỔNG CỘNG:</span>
                <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#FF6B00', textAlign: 'right', wordBreak: 'break-all', marginLeft: '10px', flex: 1 }}>
                  {Number(totalPrice).toLocaleString()}đ
                </span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                style={{ width: '100%', padding: '15px', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
              >
                TIẾN HÀNH THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}