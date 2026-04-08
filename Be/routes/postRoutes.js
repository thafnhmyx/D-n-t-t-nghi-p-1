const express = require('express');
const router = express.Router();
// Nhớ lấy thêm getPostById vào trong dấu ngoặc nhọn
const { getPosts, getPostById } = require('../controllers/postController'); 

router.get('/', getPosts);
// 👉 THÊM DÒNG NÀY ĐỂ NHẬN ID BÀI VIẾT:
router.get('/:id', getPostById); 

module.exports = router;