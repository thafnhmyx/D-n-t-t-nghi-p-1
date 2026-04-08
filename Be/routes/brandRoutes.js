const express = require('express');
const router = express.Router();

// 👇 ĐÃ SỬA: Import đầy đủ các hàm cần thiết từ Controller
const { 
    getBrands, 
    getBrandById, 
    addBrand, 
    toggleBrandStatus 
} = require('../controllers/brandController');

// 1. Lấy toàn bộ danh sách hãng (Dùng cho menu xổ xuống và trang quản lý)
router.get('/', getBrands);

// 2. Lấy chi tiết 1 hãng cụ thể
router.get('/:id', getBrandById);

// 3. Thêm thương hiệu mới (Dùng phương thức POST)
router.post('/', addBrand);

// 4. Bật/Tắt trạng thái thương hiệu (Dùng PATCH để đổi từ Available <-> Hidden)
// Route này sẽ khớp với axios.patch(`${API_URL}/brands/${id}/toggle-status`) ở React
router.patch('/:id/toggle-status', toggleBrandStatus);

module.exports = router;