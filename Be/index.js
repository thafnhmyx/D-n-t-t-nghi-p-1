const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 1. Nạp biến môi trường (Config)
dotenv.config();

// 2. Import cấu hình Database và Middleware
const db = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// --- 3. Middleware Cơ Bản ---
app.use(cors()); // Cho phép Frontend (React) gọi API
app.use(express.json()); // Đọc dữ liệu JSON từ request
app.use(express.urlencoded({ extended: true }));

// --- 4. Cấu hình Thư mục Ảnh (Static Folder) ---
// Giúp hiển thị ảnh giày tại: http://localhost:5000/images/ten_anh.jpg
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- 5. Khai báo các Routes (Lộ trình API) ---

// Nhóm 1: Hệ thống người dùng & Bảo mật
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/address', require('./routes/addressRoutes')); 

// Nhóm 2: Sản phẩm & Phân loại
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/variants', require('./routes/variantRoutes')); 
app.use('/api/brands', require('./routes/brandRoutes'));   // Khớp 100% với Frontend (không có chữ 's')
app.use('/api/categories', require('./routes/categoryRoutes')); 

// Nhóm 3: Giao dịch & Tương tác
app.use('/api/orders', require('./routes/orderRoutes')); 
app.use('/api/reviews', require('./routes/reviewRoutes')); 
app.use('/api/posts', require('./routes/postRoutes')); 

// 👉 QUAN TRỌNG: Lộ trình xử lý thanh toán VNPAY
app.use('/api/payments', require('./routes/paymentRoutes')); 

// --- 6. Route kiểm tra trạng thái Server ---
app.get('/', (req, res) => {
    res.send('👟 Shoe Shop API (NewSneaker) is running smoothly...');
});

// --- 7. Middleware xử lý lỗi (BẮT BUỘC để cuối cùng) ---
app.use(errorHandler);

// --- 8. Khởi động Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('--------------------------------------------------');
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`📁 Thư mục ảnh: http://localhost:${PORT}/images`);
    console.log('--------------------------------------------------');
});