const db = require('../config/db');

// Hàm cũ của bạn (giữ nguyên)
exports.getPosts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM post ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy bài viết" });
    }
};

// 👉 THÊM HÀM MỚI NÀY VÀO ĐÂY:
exports.getPostById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM post WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" });
        }
        res.json(rows[0]); 
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống khi lấy bài viết" });
    }
};