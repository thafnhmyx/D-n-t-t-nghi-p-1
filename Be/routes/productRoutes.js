const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
    getProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    toggleProductStatus 
} = require('../controllers/productController');

// CẤU HÌNH MULTER UPLOAD ẢNH
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// ==========================================
// CÁC ROUTE CỐ ĐỊNH (Phải đặt TRƯỚC route có tham số :id)
// ==========================================

// Route lấy tất cả sản phẩm
router.get('/', getProducts);

// Route trả về mảng size cố định cho Frontend
router.get('/all/sizes', (req, res) => {
    res.json([39, 40, 41, 42, 43]); 
});

// Thêm mới sản phẩm (có upload ảnh)
router.post('/', upload.single('image'), addProduct); 

// ==========================================
// CÁC ROUTE ĐỘNG CHỨA :id (Phải đặt phía DƯỚI)
// ==========================================

// Lấy chi tiết 1 sản phẩm theo ID
router.get('/:id', getProductById);

// Cập nhật sản phẩm (có upload ảnh)
router.put('/:id', upload.single('image'), updateProduct);

// Route cho nút Bật/Tắt trạng thái sản phẩm
router.patch('/:id/toggle-status', toggleProductStatus); 

// Xóa sản phẩm
router.delete('/:id', deleteProduct); 

module.exports = router;