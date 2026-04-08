const db = require('../config/db');

// 1. Lấy danh sách Thương hiệu (ĐÃ CẬP NHẬT LỌC ẨN HIỆN)
exports.getBrands = async (req, res) => {
    try {
        // Kiểm tra xem request có truyền ?isAdmin=true không
        const isAdminRequest = req.query.isAdmin === 'true';

        let sql = 'SELECT * FROM `brand`';

        // Nếu KHÔNG PHẢI Admin gọi (là khách hàng), chỉ lấy những cái Available
        if (!isAdminRequest) {
            sql += " WHERE status = 'Available' ";
        }

        sql += ' ORDER BY id DESC';

        const [brands] = await db.query(sql);
        res.json(brands);
    } catch (error) {
        console.error("🔥 Lỗi getBrands:", error.message);
        res.status(500).json({ message: "Lỗi lấy danh sách" });
    }
};

// 2. Thêm thương hiệu
exports.addBrand = async (req, res) => {
    const { name } = req.body; 
    if (!name) return res.status(400).json({ message: "Thiếu tên thương hiệu" });

    try {
        const sql = 'INSERT INTO `brand` (name, status) VALUES (?, ?)';
        await db.query(sql, [name, 'Available']);
        res.json({ success: true, message: "Thêm thành công" });
    } catch (error) {
        console.error("🔥 Lỗi addBrand:", error.message);
        res.status(500).json({ message: "Lỗi khi thêm" });
    }
};

// 3. Bật/Tắt trạng thái (Ẩn/Hiện)
exports.toggleBrandStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT status FROM `brand` WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Không thấy ID" });

        const currentStatus = rows[0].status || 'Available';
        const newStatus = (currentStatus === 'Hidden') ? 'Available' : 'Hidden';
        
        await db.query('UPDATE `brand` SET status = ? WHERE id = ?', [newStatus, id]);

        // Cập nhật trạng thái của tất cả sản phẩm thuộc brand này
        // await db.query('UPDATE `products` SET status = ? WHERE brand_id = ?', [newStatus, id]);

        res.json({ success: true, status: newStatus });
    } catch (error) {
        console.error("🔥 Lỗi toggleBrandStatus:", error.message);
        res.status(500).json({ message: "Lỗi đổi trạng thái" });
    }
};

// 4. Lấy chi tiết 1 hãng
exports.getBrandById = async (req, res) => {
    try {
        const [brand] = await db.query('SELECT * FROM `brand` WHERE id = ?', [req.params.id]);
        if (brand.length > 0) {
            res.json(brand[0]);
        } else {
            res.status(404).json({ message: "Không tìm thấy thương hiệu" });
        }
    } catch (error) {
        console.error("🔥 Lỗi tại getBrandById:", error.message);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};