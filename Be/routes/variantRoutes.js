const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ==========================================================
// 1. LẤY DANH SÁCH BIẾN THỂ THEO ID SẢN PHẨM
// ==========================================================
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM productsvariants WHERE ProductID = ?", [req.params.id]);
        res.json(rows);
    } catch (err) {
        console.error("🔥 Lỗi lấy dữ liệu biến thể:", err.message);
        res.status(500).json({ message: "Lỗi hệ thống khi lấy thông tin size/màu", detail: err.message });
    }
});

// ==========================================================
// 2. THÊM MỚI HOẶC CỘNG DỒN SỐ LƯỢNG (LOGIC SIÊU CHUẨN)
// ==========================================================
router.post('/', async (req, res) => {
    const { product_id, size, quantity } = req.body;

    if (!size || !product_id) {
        return res.status(400).json({ message: "Thiếu thông tin Size hoặc ID sản phẩm!" });
    }

    try {
        // BƯỚC 1: Kiểm tra xem Size này của Sản phẩm này đã tồn tại trong DB chưa?
        const [existing] = await db.query(
            "SELECT * FROM productsvariants WHERE ProductID = ? AND size = ?", 
            [product_id, size]
        );

        if (existing.length > 0) {
            // BƯỚC 2A: NẾU ĐÃ CÓ -> Lấy số lượng cũ cộng dồn với số lượng mới
            // Ép kiểu Number() để chắc chắn 105 + 15 = 120 (chứ không bị nối chuỗi thành 10515)
            const newQuantity = Number(existing[0].quantity) + Number(quantity);
            
            await db.query(
                "UPDATE productsvariants SET quantity = ? WHERE id = ?", 
                [newQuantity, existing[0].id] // Cập nhật dựa theo ID của dòng cũ
            );
            res.json({ message: "Đã cộng dồn số lượng thành công!" });
            
        } else {
            // BƯỚC 2B: NẾU CHƯA CÓ -> Tạo mới hoàn toàn
            await db.query(
                "INSERT INTO productsvariants (ProductID, size, quantity) VALUES (?, ?, ?)", 
                [product_id, size, quantity]
            );
            res.json({ message: "Đã thêm kích thước mới thành công!" });
        }
    } catch (err) {
        console.error("🔥 Lỗi SQL:", err.message);
        res.status(500).json({ message: "Lỗi Database", detail: err.message });
    }
});

// ==========================================================
// 3. CẬP NHẬT TRỰC TIẾP SỐ LƯỢNG (KHI RỜI CHUỘT KHỎI Ô NHẬP)
// ==========================================================
router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        // Cập nhật số lượng dựa vào ID (Primary Key) của bảng productsvariants
        await db.query("UPDATE productsvariants SET quantity = ? WHERE id = ?", [quantity, req.params.id]);
        res.json({ message: "Cập nhật số lượng thành công!" });
    } catch (err) {
        console.error("🔥 Lỗi cập nhật số lượng:", err.message);
        res.status(500).json({ message: "Lỗi hệ thống", detail: err.message });
    }
});


module.exports = router;