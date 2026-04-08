import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

// ... các import giữ nguyên ...

const EditProduct = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { fetchProducts } = useContext(AdminContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        // 👇 Kiểm tra xem res.data có thuộc tính image không
        console.log("Dữ liệu sản phẩm cũ:", res.data); 
        setProduct(res.data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết sản phẩm:", error);
      }
    };
    getProduct();
  }, [id, API_URL]);

  const handleUpdate = async (formData) => {
    try {
      // Trước khi gửi, kiểm tra xem người dùng có chọn ảnh mới không
      // Nếu không chọn (image là string), bạn có thể xử lý tùy ý hoặc để Backend lo
      await axios.put(`${API_URL}/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Cập nhật thành công!");
      fetchProducts();
      navigate('/admin/products');
    } catch (err) {
      console.error("Chi tiết lỗi cập nhật:", err);
      alert("Lỗi khi cập nhật sản phẩm");
    }
  };

  if (!product) return <p style={{ marginLeft: '270px', padding: '50px' }}>Đang tải dữ liệu...</p>;

  return (
    <div style={{ padding: '20px', marginLeft: '250px', background: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Chỉnh sửa sản phẩm: #{id}</h2>
      <ProductForm 
        key={id} 
        initialData={product} 
        onSubmit={handleUpdate} 
        buttonText="LƯU THAY ĐỔI" 
      />
    </div>
  );
};

export default EditProduct;