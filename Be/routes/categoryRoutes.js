const express = require('express');
const router = express.Router();

// 👇 ĐÃ SỬA: Import hàm toggleCategoryStatus thay vì deleteCategory
const { 
    getCategories, 
    addCategory, 
    toggleCategoryStatus 
} = require('../controllers/categoryController');

// 1. Lấy danh sách danh mục
router.get('/', getCategories);

// 2. Thêm danh mục mới 
router.post('/', addCategory);

// 3. 👇 ĐÃ SỬA: Thay đổi từ Xóa vĩnh viễn sang Bật/Tắt trạng thái (Ẩn/Hiện)
// Sử dụng phương thức PATCH để cập nhật trạng thái
router.patch('/:id/toggle-status', toggleCategoryStatus);

module.exports = router;