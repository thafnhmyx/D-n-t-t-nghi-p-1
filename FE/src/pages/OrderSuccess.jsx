import React, { useEffect, useContext, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useContext(CartContext);
  
  // Dùng useRef để đảm bảo việc xóa giỏ hàng chỉ chạy đúng 1 lần duy nhất
  const hasCleared = useRef(false);

  const amount = searchParams.get('vnp_Amount');
  const responseCode = searchParams.get('vnp_ResponseCode');
  const transactionNo = searchParams.get('vnp_BankTranNo');
  const realAmount = amount ? (Number(amount) / 100) : 0;

  // Logic xóa giỏ hàng khi thanh toán thành công
  useEffect(() => {
    if (responseCode === '00' && !hasCleared.current) {
      if (clearCart) {
        clearCart();
        hasCleared.current = true; // Đánh dấu đã xóa để không gây lỗi render lại
      }
    }
  }, [responseCode, clearCart]);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px' }}>
        
        {responseCode === '00' ? (
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
            <h1 style={{ color: '#2ecc71', marginBottom: '15px' }}>THANH TOÁN THÀNH CÔNG!</h1>
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
              Cảm ơn bạn đã mua sắm tại New Sneaker. Đơn hàng của bạn đang được xử lý.
            </p>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', textAlign: 'left', marginBottom: '30px' }}>
              <p><strong>Số tiền thanh toán:</strong> <span style={{ color: '#FF6B00', fontWeight: 'bold' }}>{realAmount.toLocaleString('vi-VN')} VNĐ</span></p>
              <p><strong>Mã giao dịch ngân hàng:</strong> {transactionNo}</p>
            </div>

            {/* Trả lại thẻ Link nguyên bản của Vinh để mượt mà nhất */}
            <Link 
              to="/" 
              style={{ 
                display: 'inline-block', // Thêm cái này để vùng bấm to và chuẩn
                padding: '15px 30px', 
                background: '#000', 
                color: '#fff', 
                textDecoration: 'none', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                fontSize: '16px' 
              }}
            >
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        ) : (
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
             <div style={{ fontSize: '60px', marginBottom: '20px' }}>❌</div>
             <h1 style={{ color: '#e74c3c', marginBottom: '15px' }}>THANH TOÁN THẤT BẠI!</h1>
             <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
               Giao dịch bị hủy hoặc có lỗi xảy ra. Vui lòng thử lại.
             </p>
             <Link to="/cart" style={{ display: 'inline-block', padding: '15px 30px', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
              QUAY LẠI GIỎ HÀNG
            </Link>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}