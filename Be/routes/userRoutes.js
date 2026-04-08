const express = require('express');
const router = express.Router();

// 1. IMPORT CÁC HÀM TỪ CONTROLLER
// Nhúng authController (chứa đăng ký, đăng nhập) mà chúng ta vừa sửa lúc nãy
const authController = require('../controllers/authController'); 

// Nhúng userController (chứa các chức năng của Admin & Profile)
const { 
    getUserProfile, 
    getAllUsers, 
    toggleAdminStatus 
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// ==========================================
// 🚀 CÁC ĐƯỜNG DẪN XÁC THỰC TÀI KHOẢN (THÊM MỚI)
// ==========================================

// Đăng ký tài khoản (ĐÂY CHÍNH LÀ ĐƯỜNG DẪN BẠN ĐANG THIẾU)
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Lấy thông tin cá nhân (Nếu Frontend của bạn có gọi /api/users/me)
router.get('/me', protect, authController.getMe);


// ==========================================
// 🛠️ CÁC ĐƯỜNG DẪN QUẢN LÝ USER (GIỮ NGUYÊN)
// ==========================================

// Lấy profile cá nhân (Dùng chung với getUserProfile của bạn)
router.get('/profile', protect, getUserProfile);

// Admin lấy toàn bộ danh sách user
router.get('/', protect, admin, getAllUsers);

// Cập nhật quyền Admin (Phân quyền)
router.put('/update-role/:id', protect, admin, toggleAdminStatus);

module.exports = router;