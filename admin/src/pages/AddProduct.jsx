import React, { useContext } from 'react';
import ProductForm from '../components/ProductForm';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const { fetchProducts } = useContext(AdminContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleAdd = async (formData) => {
    try {
      await axios.post(`${API_URL}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Thêm sản phẩm thành công!");
      fetchProducts();
      navigate('/admin/products');
    } catch (err) {
      console.error("Chi tiết lỗi:", err); 
      alert("Lỗi khi thêm sản phẩm: " + (err.response?.data?.message || "Không thể kết nối server"));
    }
  };

return (
    <div style={{ 
      padding: '40px 0',              
      /* ĐÃ XÓA marginLeft Ở ĐÂY VÌ LAYOUT TỔNG ĐÃ LO RỒI */
      width: '100%',                  // Chiếm trọn không gian còn lại
      backgroundColor: '#f9fafb', 
      minHeight: 'calc(100vh - 60px)', // Trừ hao phần Header phía trên
      display: 'flex',
      justifyContent: 'center',       // Căn giữa theo chiều ngang
      alignItems: 'flex-start',       // Form bắt đầu từ trên xuống
      boxSizing: 'border-box'
    }}>
      
      {/* Container chính - Giới hạn chiều rộng ở mức 800px */}
      <div style={{ 
        width: '90%', 
        maxWidth: '800px', 
        padding: '0 20px' 
      }}>
    

        {/* Form chính */}
        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden' 
        }}>
          <ProductForm onSubmit={handleAdd} buttonText="THÊM SẢN PHẨM" />
        </div>

      </div>
    </div>
  );
};

export default AddProduct;