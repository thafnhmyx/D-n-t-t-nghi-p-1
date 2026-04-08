import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddressForm from '../components/AddressForm';
import PaymentMethods from '../components/PaymentMethods';
import SuccessModal from '../components/SuccessModal';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. TỰ ĐỘNG ĐIỀN THÔNG TIN USER KHI VÀO TRANG & CUỘN LÊN ĐẦU
  useEffect(() => {
    window.scrollTo(0, 0);

    // Lấy thông tin từ AuthContext
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const currentUser = user || savedUser;

    if (currentUser) {
      setAddressData(prev => ({
        ...prev,
        // Điền tên "Thành Mỹ" và số điện thoại sẵn có vào form
        fullName: currentUser.fullname || currentUser.name || '',
        phone: currentUser.phone || ''
      }));
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const token = user?.token || savedUser?.token;

    // 2. Kiểm tra đăng nhập
    if (!token) {
      alert("Vui lòng đăng nhập để tiến hành thanh toán!");
      navigate('/login');
      return;
    }

    // 3. Validate Form thông tin giao hàng
    if (!addressData.fullName.trim() || !addressData.phone.trim() || !addressData.address.trim()) {
      alert("Vui lòng điền đầy đủ và chính xác thông tin giao hàng!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng rỗng, không thể đặt hàng!");
      return;
    }

    // 4. Chốt chặn dữ liệu variant_id (quan trọng để trừ kho)
    const hasInvalidItem = cartItems.some(item => !item.variant_id);
    if (hasInvalidItem) {
      alert("Phát hiện sản phẩm không hợp lệ trong giỏ hàng. Hệ thống sẽ quay về giỏ hàng.");
      navigate('/cart');
      return;
    }

    try {
      setIsProcessing(true);

      const items = cartItems.map(item => ({
        variant_id: item.variant_id,
        quantity: item.qty,
        price: item.price
      }));

      const orderPayload = {
        user_id: user?.id || user?._id || savedUser?.id,
        total_money: totalPrice,
        payment_method: paymentMethod,
        items: items,
        fullname: addressData.fullName,
        phone: addressData.phone,
        address: addressData.address
      };

      // 5. Gửi API tạo đơn hàng lên Server
      const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 201 || res.data.success) {
        const currentId = res.data.orderId || res.data.data?.orderId;
        setOrderId(currentId);

        // NẾU LÀ THANH TOÁN VNPAY ONLINE
        if (paymentMethod === 'VNPAY') {
          const payRes = await axios.post('http://localhost:5000/api/payments/create-url', {
            orderId: currentId,
            amount: totalPrice
          });
          if (payRes.data.vnpUrl) window.location.href = payRes.data.vnpUrl;
        } 
        // NẾU LÀ COD (THANH TOÁN KHI NHẬN HÀNG)
        else {
          setShowSuccess(true);
          clearCart();
          window.scrollTo(0, 0);
        }
      }
    } catch (err) {
      console.error("❌ LỖI THANH TOÁN:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Hệ thống đang bận, vui lòng thử lại sau!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page" style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', flex: 1, width: '100%' }}>
        <h1 style={{ marginBottom: '40px', fontWeight: '900', textAlign: 'center', fontSize: '32px', letterSpacing: '1px' }}>THANH TOÁN</h1>

        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          
          {/* CỘT TRÁI: FORM ĐỊA CHỈ & PHƯƠNG THỨC THANH TOÁN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <AddressForm addressData={addressData} setAddressData={setAddressData} />
            </div>
            <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <PaymentMethods method={paymentMethod} setMethod={setPaymentMethod} />
            </div>
          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG (STICKY) */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 25px rgba(0,0,0,0.08)', position: 'sticky', top: '20px', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px', fontWeight: '700' }}>
              CHI TIẾT ĐƠN HÀNG ({cartItems.length})
            </h3>
            
            <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '25px', paddingRight: '10px' }}>
              {cartItems.map(item => (
                <div key={`${item.variant_id}`} style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
                  <img 
                    src={`http://localhost:5000/images/${item.image}`} 
                    alt={item.name} 
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', background: '#f9f9f9' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#222', lineHeight: '1.4' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#777', marginTop: '4px' }}>
                      Size: <span style={{ color: '#000', fontWeight: '600' }}>{item.selectedSize}</span> | SL: {item.qty}
                    </div>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>
                    {(item.price * item.qty).toLocaleString()}đ
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px dashed #eee', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
                <span>Tạm tính:</span>
                <span>{totalPrice.toLocaleString()}đ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#666' }}>
                <span>Phí giao hàng:</span>
                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Miễn phí</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '15px', background: '#fffaf0', borderRadius: '10px', border: '1px solid #ffe4b5' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>THÀNH TIỀN:</span>
                <span style={{ fontWeight: '900', fontSize: '26px', color: '#e67e22' }}>{totalPrice.toLocaleString()}đ</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{ 
                  width: '100%', padding: '18px', background: isProcessing ? '#95a5a6' : '#111', 
                  color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', 
                  fontSize: '17px', cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                {isProcessing ? 'ĐANG XỬ LÝ...' : 'HOÀN TẤT ĐẶT HÀNG'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL THÔNG BÁO THÀNH CÔNG */}
      {showSuccess && (
        <SuccessModal 
          orderId={orderId} 
          onClose={() => { 
            setShowSuccess(false); 
            // 👉 ĐÃ SỬA: Chuyển về trang Quản lý đơn hàng của bạn
            navigate('/my-orders'); 
          }} 
        />
      )}
      <Footer />
    </div>
  );
}