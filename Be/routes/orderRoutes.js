const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// 1. Lấy danh sách tất cả đơn hàng (Dùng cho trang Admin)
// Lộ trình: GET http://localhost:5000/api/orders/
router.get('/', orderController.getOrders);

// 2. Lấy đơn hàng theo User ID (Dùng cho trang My Orders của Vinh)
// Lộ trình: GET http://localhost:5000/api/orders/user/:userId
router.get('/user/:userId', orderController.getOrdersByUser);

// 3. Lấy chi tiết một đơn hàng cụ thể (Dùng cho Popup chi tiết)
// Lộ trình: GET http://localhost:5000/api/orders/:id
router.get('/:id', orderController.getOrderDetails);

// 4. Cập nhật trạng thái đơn hàng (Dùng cho Admin hoặc Hủy đơn)
// Lộ trình: PUT http://localhost:5000/api/orders/:id/status
router.put('/:id/status', orderController.updateStatus);

// 5. Tạo đơn hàng mới (Dùng khi bấm Hoàn tất đặt hàng)
// Lộ trình: POST http://localhost:5000/api/orders/
router.post('/', orderController.createOrder);

// 🚨 Bắt buộc phải có dòng này để index.js nhận diện được router
module.exports = router;