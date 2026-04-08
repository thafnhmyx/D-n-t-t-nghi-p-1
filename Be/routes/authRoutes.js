const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/authController'); // 1. Thêm forgotPassword vào đây
const { protect } = require('../middleware/authMiddleware');

// Route Đăng ký
router.post('/register', register);

// Route Đăng nhập
router.post('/login', login);

// ✅ Route Quên mật khẩu (HÀM MỚI THÊM)
// Route này không cần 'protect' vì khách chưa đăng nhập mới cần dùng
router.post('/forgot-password', forgotPassword);

// Route lấy thông tin cá nhân (Cần đăng nhập)
router.get('/me', protect, getMe);

module.exports = router;