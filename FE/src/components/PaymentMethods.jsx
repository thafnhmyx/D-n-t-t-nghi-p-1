import React from 'react';

export default function PaymentMethods({ method, setMethod }) {
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>PHƯƠNG THỨC THANH TOÁN</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <label style={{ border: method === 'COD' ? '2px solid #FF6B00' : '1px solid #ddd', padding: '15px', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>
          <input type="radio" name="pay" value="COD" checked={method === 'COD'} onChange={() => setMethod('COD')} />
          &nbsp; Thanh toán khi nhận hàng (COD)
        </label>
        <label style={{ border: method === 'VNPAY' ? '2px solid #FF6B00' : '1px solid #ddd', padding: '15px', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>
          <input type="radio" name="pay" value="VNPAY" checked={method === 'VNPAY'} onChange={() => setMethod('VNPAY')} />
          &nbsp; Thanh toán qua VNPAY
        </label>
      </div>
    </div>
  );
}