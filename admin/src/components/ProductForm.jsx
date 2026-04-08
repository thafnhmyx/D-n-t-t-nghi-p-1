import React, { useState, useContext } from 'react'; // Bỏ useEffect ở đây
import { AdminContext } from '../context/AdminContext';

const ProductForm = ({ initialData, onSubmit, buttonText }) => { 
  // 1. Lấy dữ liệu từ Context
  const adminData = useContext(AdminContext) || {};
  const allBrands = adminData.brands || [];
  const allCategories = adminData.categories || [];

  const [product, setProduct] = useState({
    name: initialData?.name || initialData?.Name || '', 
    price: initialData?.price || initialData?.Price || '',
    category_id: initialData?.category_id || initialData?.CategoryId || '',
    brand_id: initialData?.brand_id || initialData?.BrandId || '',
    description: initialData?.description || initialData?.Description || '',
    image: initialData?.image || null 
  });

  const [preview, setPreview] = useState(null); 
  const IMAGE_URL = 'http://localhost:5000/images';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({ ...prev, image: file })); 
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', product.name);
    fd.append('price', product.price);
    fd.append('category_id', product.category_id);
    fd.append('brand_id', product.brand_id);
    fd.append('description', product.description || "");

    if (product.image instanceof File) {
      fd.append('image', product.image);
    } else if (typeof product.image === 'string') {
      fd.append('image', product.image);
    }
    onSubmit(fd);
  };

  const inputStyle = { 
    width: '100%', padding: '12px', marginBottom: '20px', 
    borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <label style={{fontWeight: 'bold', display: 'block', marginBottom: '8px'}}>Tên sản phẩm:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} style={inputStyle} placeholder="Nhập tên giày..." required />

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{fontWeight: 'bold', display: 'block', marginBottom: '8px'}}>Danh mục:</label>
          <select name="category_id" value={product.category_id} onChange={handleChange} style={inputStyle} required>
            <option value="">-- Chọn loại giày --</option>
            {allCategories.map(c => (
                <option key={c.id} value={c.id}>{c.Name || c.name}</option>
            ))}
          </select>
        </div>
        
        <div style={{ flex: 1 }}>
          <label style={{fontWeight: 'bold', display: 'block', marginBottom: '8px'}}>Thương hiệu:</label>
          <select name="brand_id" value={product.brand_id} onChange={handleChange} style={inputStyle} required>
            <option value="">-- Chọn hãng --</option>
            {allBrands.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <label style={{fontWeight: 'bold', display: 'block', marginBottom: '8px'}}>Giá bán (VNĐ):</label>
      <input type="number" name="price" value={product.price} onChange={handleChange} style={inputStyle} placeholder="Ví dụ: 1200000" required />

      <label style={{fontWeight: 'bold', display: 'block', marginBottom: '8px'}}>Hình ảnh sản phẩm:</label>
      <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px dashed #ccc', padding: '10px', borderRadius: '8px' }}>
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
        ) : (
          <p style={{ color: '#999', fontSize: '13px' }}>Vui lòng chọn ảnh</p>
        )}
      </div>
      <input type="file" onChange={handleFileChange} style={{...inputStyle, border: 'none'}} required={!initialData} />

      <button type="submit" style={{ width: '100%', padding: '14px', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;