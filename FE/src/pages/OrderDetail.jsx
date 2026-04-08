import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
    const { id } = useParams(); 
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/orders/${id}`)
            .then(res => {
                console.log("Dữ liệu chi tiết:", res.data); // Vinh bật F12 xem có fullname/phone/address ở đây chưa
                setDetails(res.data);
            })
            .catch(err => console.error("Lỗi lấy chi tiết:", err));
    }, [id]);

    return (
        <div style={{ padding: '40px 10%', minHeight: '80vh', fontFamily: 'Arial, sans-serif' }}>
            <button 
                onClick={() => navigate(-1)} 
                style={{ marginBottom: '20px', cursor: 'pointer', padding: '8px 15px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
                ← Quay lại lịch sử
            </button>
            
            <h2 style={{ borderBottom: '2px solid #f37021', paddingBottom: '10px', textTransform: 'uppercase' }}>
                Chi tiết đơn hàng #{id}
            </h2>

            <div style={{ border: '1px dashed #f37021', padding: '20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                
                {/* Phần danh sách sản phẩm (Bên trái) */}
                <div style={{ width: '60%', minWidth: '300px' }}>
                    {details.length > 0 ? details.map((item, index) => (
                        <div key={index} style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <img 
                                src={`http://localhost:5000/images/${item.image || item.product_image}`} 
                                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px', borderRadius: '8px' }} 
                                alt=""
                                onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                            />
                            <div>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{item.name || item.product_name}</h4>
                                <p style={{ margin: '5px 0', color: '#666' }}>Size: {item.size}</p>
                                <p style={{ margin: '5px 0', color: '#666' }}>Số lượng: {item.quantity}</p>
                                <p style={{ margin: '5px 0', color: '#f37021', fontWeight: 'bold' }}>
                                    Giá: {Number(item.price).toLocaleString()}đ
                                </p>
                            </div>
                        </div>
                    )) : <p>Đang tải sản phẩm...</p>}
                    </div>

                {/* Thông tin người nhận (Bên phải) */}
                <div style={{ width: '35%', minWidth: '250px', borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                    <h4 style={{ textTransform: 'uppercase', marginTop: 0, color: '#000' }}>Thông tin người nhận</h4>
                    <div style={{ lineHeight: '1.8' }}>
                        <p><strong>Họ tên:</strong> {details[0]?.fullname}</p>
                        <p><strong>Số điện thoại:</strong> {details[0]?.phone_number}</p> {/* ĐÃ SỬA Ở ĐÂY */}
                        <p><strong>Địa chỉ:</strong> {details[0]?.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;