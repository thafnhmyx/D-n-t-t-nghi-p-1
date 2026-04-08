import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import VariantManager from '../components/VariantManager';

const ProductVariants = () => {
  const { id } = useParams(); 
  const { API_URL } = useContext(AdminContext);

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productName, setProductName] = useState("");
  
  const [refresh, setRefresh] = useState(0); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resVar, resProd] = await Promise.all([
          axios.get(`${API_URL}/variants/${id}`), 
          axios.get(`${API_URL}/products/${id}`)
        ]);
        setVariants(resVar.data || []);
        setProductName(resProd.data?.name || "Sản phẩm");

        setColors([
          { id: 'Đen', name: 'Màu Đen' },
          { id: 'Trắng', name: 'Màu Trắng' }
        ]);
        
        const resSize = await axios.get(`${API_URL}/products/all/sizes`);
        const formattedSizes = resSize.data.map(s => ({ id: s, name: `Size ${s}` }));
        setSizes(formattedSizes);

      } catch (err) {
        console.error("Lỗi fetch data:", err);
      }
    };

    loadData();
  }, [API_URL, id, refresh]); 

  // ===============================================
  // 1. XỬ LÝ THÊM (Đã sửa lỗi lệch tên biến)
  // ===============================================
  const handleAddVariant = async (data) => {
    try {
      const dataToSend = { 
        product_id: id, 
        // 👇 SỬA LẠI THÀNH data.size CHO KHỚP VỚI VARIANT_MANAGER
        size: data.size,  
        quantity: data.quantity
      };
      
      // Nếu quên chọn size thì chặn lại luôn
      if (!dataToSend.size) {
        alert("Vui lòng chọn Size!");
        return;
      }

      await axios.post(`${API_URL}/variants`, dataToSend);
      alert("Thêm phân loại thành công!");
      
      setRefresh(prev => prev + 1); 
    } catch (err) {
      console.error(err);
      alert("Lỗi: Biến thể này có thể đã tồn tại!");
    }
  };

  const handleUpdateQty = async (varId, qty) => {
    try {
      await axios.put(`${API_URL}/variants/${varId}`, { quantity: qty });
      setVariants(prev => prev.map(v => v.id === varId ? { ...v, quantity: Number(qty) } : v));
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
    }
  };

  const handleDeleteVariant = async (varId) => {
    if (window.confirm("Bạn có chắc muốn xóa phân loại kho hàng này?")) {
      try {
        await axios.delete(`${API_URL}/variants/${varId}`);
        setVariants(prev => prev.filter(v => v.id !== varId));
      } catch (err) {
        console.error("Lỗi xóa:", err);
      }
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f0f2f5', minHeight: '100vh', marginLeft: '30px' }}>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Quản lý kho hàng</h2>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Sản phẩm: <strong style={{ color: '#FF6B00' }}>{productName}</strong>
        </p>
      </div>

      <VariantManager 
        variants={variants} 
        colors={colors} 
        sizes={sizes} 
        onAddVariant={handleAddVariant}
        onUpdateQty={handleUpdateQty}
        onDeleteVariant={handleDeleteVariant}
      />
      
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            borderRadius: '8px', 
            border: '1px solid #ccc', 
            background: '#fff',
            fontWeight: 'bold',
            transition: '0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#e9ecef'}
          onMouseOut={(e) => e.target.style.background = '#fff'}
        >
          ← Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default ProductVariants;