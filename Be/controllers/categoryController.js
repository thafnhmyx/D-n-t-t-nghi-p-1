const db = require('../config/db');

// 1. Lấy tất cả danh mục (ĐÃ CẬP NHẬT LỌC ẨN HIỆN)
exports.getCategories = async (req, res) => {
    try {
        // Kiểm tra xem request có truyền ?isAdmin=true không
        const isAdminRequest = req.query.isAdmin === 'true';

        let sql = 'SELECT * FROM `categories`';

        // Nếu KHÔNG PHẢI Admin gọi, chỉ lấy những cái đang hiển thị (Available)
        if (!isAdminRequest) {
            sql += " WHERE status = 'Available' ";
        }

        sql += ' ORDER BY Id DESC';

        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) { 
        console.error("🔥 Lỗi tại getCategories:", error.message);
        res.status(500).json({ message: "Lỗi server khi lấy danh mục" }); 
    }
};

// 2. Thêm danh mục mới
exports.addCategory = async (req, res) => {
    const categoryName = req.body.name || req.body.Name;
    if (!categoryName) return res.status(400).json({ message: "Thiếu tên danh mục" });

    try {
        const sql = 'INSERT INTO `categories` (Name, status) VALUES (?, ?)';
        await db.query(sql, [categoryName, 'Available']);
        res.json({ success: true, message: "Thêm thành công" });
    } catch (error) { 
        console.error("🔥 Lỗi tại addCategory:", error.message);
        res.status(500).json({ message: "Lỗi khi thêm" }); 
    }
};

// 3. Bật/Tắt ẩn hiện (Thay thế nút xóa)
exports.toggleCategoryStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT status FROM `categories` WHERE Id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Không thấy danh mục" });

        const currentStatus = rows[0].status || 'Available';
        const newStatus = (currentStatus === 'Hidden') ? 'Available' : 'Hidden';

        await db.query('UPDATE `categories` SET status = ? WHERE Id = ?', [newStatus, id]);

        // Cập nhật trạng thái của tất cả sản phẩm thuộc category này
        // await db.query('UPDATE `products` SET status = ? WHERE category_id = ?', [newStatus, id]);

        res.json({ success: true, status: newStatus });
    } catch (error) { 
        console.error("🔥 Lỗi tại toggleCategoryStatus:", error.message);
        res.status(500).json({ message: "Lỗi đổi trạng thái" }); 
    }
};