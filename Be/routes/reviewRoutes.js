const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Route gửi đánh giá
router.post('/', protect, createReview);

// Dòng 7: Route lấy đánh giá sản phẩm
// Đảm bảo getProductReviews đã được định nghĩa ở file controller trên
router.get('/:productId', getProductReviews); 

module.exports = router;