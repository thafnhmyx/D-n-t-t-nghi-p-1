import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductSidebar from '../components/ProductSidebar';
import ProductToolbar from '../components/ProductToolbar';
import ProductGrid from '../components/ProductGrid';

export default function ProductsPage() {
  const [total, setTotal] = useState(0);

  // ✅ CHUẨN HÓA STATE: Thêm biến lưu tên để hiển thị Tag chính xác 100%
  const [filters, setFilters] = useState({
    categoryId: null,
    categoryName: '', // Lưu tên danh mục chọn từ Sidebar
    brandId: null,
    brandName: '',    // Lưu tên thương hiệu chọn từ Sidebar
    sort: 'newest', 
    search: ''
  });

  const handleFilterChange = (newFilter) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
  };

  const resetFilters = () => {
    setFilters({
      categoryId: null,
      categoryName: '',
      brandId: null,
      brandName: '',
      sort: 'newest',
      search: ''
    });
  };

  const tagStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f5f5f5',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#333',
    border: '1px solid #e8e8e8',
    fontWeight: '500'
  };

  const removeBtnStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 2px',
    color: '#999',
    lineHeight: '1'
  };

  return (
    <div className="products-page" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header />

      <main className="container" style={{ 
        maxWidth: '1200px', 
        margin: '40px auto', 
        padding: '0 20px',
        display: 'flex',
        gap: '40px' 
      }}>
        
        <div style={{ width: '280px', flexShrink: 0 }}>
          <ProductSidebar 
            onFilterChange={handleFilterChange} 
            activeFilters={filters} 
          />
        </div>

        <div style={{ flex: 1 }}>
          
          <ProductToolbar 
            totalProducts={total} 
            currentSort={filters.sort} 
            onSortChange={(sortValue) => handleFilterChange({ sort: sortValue })}
          />

          {/* HIỂN THỊ CÁC NHÃN BỘ LỌC DỰA TRÊN TÊN NHẬN TỪ SIDEBAR */}
          {(filters.categoryId || filters.brandId || filters.search) && (
            <div style={{ 
              marginBottom: '25px', 
              display: 'flex', 
              gap: '10px', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '14px', color: '#888', marginRight: '5px' }}>Đang lọc:</span>

              {/* Tag Danh mục - Lấy thẳng từ state categoryName */}
              {filters.categoryId && (
                <div style={tagStyle}>
                  {filters.categoryName || "Danh mục"}
                  <button 
                    onClick={() => handleFilterChange({ categoryId: null, categoryName: '' })}
                    style={removeBtnStyle}
                  >✕</button>
                </div>
              )}

              {/* Tag Thương hiệu - Lấy thẳng từ state brandName */}
              {filters.brandId && (
                <div style={tagStyle}>
                  {filters.brandName || "Thương hiệu"}
                  <button 
                    onClick={() => handleFilterChange({ brandId: null, brandName: '' })}
                    style={removeBtnStyle}
                  >✕</button>
                </div>
              )}

              {/* Tag Tìm kiếm */}
              {filters.search && (
                <div style={tagStyle}>
                  "{filters.search}"
                  <button 
                    onClick={() => handleFilterChange({ search: '' })}
                    style={removeBtnStyle}
                  >✕</button>
                </div>
              )}

              <button 
                onClick={resetFilters}
                style={{ 
                  background: 'none', 
                  color: '#ff4d4f', 
                  border: 'none', 
                  padding: '5px 10px', 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Xóa tất cả
              </button>
            </div>
          )}

          <ProductGrid 
            filters={filters} 
            onFetch={(count) => setTotal(count)} 
          />

        </div>
      </main>

      <Footer />
    </div>
  );
}