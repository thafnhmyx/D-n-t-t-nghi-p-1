import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductSidebar({ onFilterChange, activeFilters }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      // 1. Lấy Danh Mục
      try {
        const resCat = await axios.get('http://localhost:5000/api/categories');
        const catData = resCat.data.categories || resCat.data.data || resCat.data;
        setCategories(Array.isArray(catData) ? catData : []);
      } catch (error) {
        console.error("🔥 LỖI LẤY DANH MỤC:", error.message);
      }

      // 2. Lấy Thương Hiệu
      try {
        const resBrand = await axios.get('http://localhost:5000/api/brands');
        const brandData = resBrand.data.brands || resBrand.data.data || resBrand.data;
        setBrands(Array.isArray(brandData) ? brandData : []);
      } catch (error) {
        console.error("🔥 LỖI LẤY THƯƠNG HIỆU:", error.message);
      }
    };

    fetchSidebarData();
  }, []);

  // Style chung cho các mục trong danh sách
  const itemStyle = (isActive) => ({
    marginBottom: '12px',
    cursor: 'pointer',
    transition: '0.2s',
    fontWeight: isActive ? '700' : '500',
    color: isActive ? '#FF6B00' : '#000',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  return (
    <aside style={{ width: '250px', paddingRight: '20px' }}>
      {/* --- PHẦN DANH MỤC --- */}
      <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '10px', fontSize: '18px' }}>DANH MỤC</h3>
      
      <ul style={{ listStyle: 'none', padding: '15px 0', margin: 0 }}>
        {categories.map(cat => {
          const catName = cat.Name || cat.name;
          const isActive = activeFilters?.categoryId === cat.id;
          
          return (
            <li 
              key={cat.id} 
              style={itemStyle(isActive)} 
              // 👇 GỬI CẢ ID VÀ NAME LÊN PAGE
              onClick={() => onFilterChange({ categoryId: cat.id, categoryName: catName })}
              onMouseOver={(e) => { if(!isActive) e.target.style.color = '#FF6B00' }}
              onMouseOut={(e) => { if(!isActive) e.target.style.color = '#000' }}
            >
              {isActive && "• "} {catName}
            </li>
          );
        })}
      </ul>

      {/* --- PHẦN THƯƠNG HIỆU --- */}
      <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginTop: '30px', fontSize: '18px' }}>THƯƠNG HIỆU</h3>
      
      <ul style={{ listStyle: 'none', padding: '15px 0', margin: 0 }}>
        {brands.map(brand => {
          const bName = brand.Name || brand.name;
          const isActive = activeFilters?.brandId === brand.id;
          
          return (
            <li 
              key={brand.id} 
              style={itemStyle(isActive)} 
              // 👇 GỬI CẢ ID VÀ NAME LÊN PAGE
              onClick={() => onFilterChange({ brandId: brand.id, brandName: bName })}
              onMouseOver={(e) => { if(!isActive) e.target.style.color = '#FF6B00' }}
              onMouseOut={(e) => { if(!isActive) e.target.style.color = '#000' }}
            >
              {isActive && "• "} {bName}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}