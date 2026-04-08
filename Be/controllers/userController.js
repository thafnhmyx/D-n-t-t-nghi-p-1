const db = require('../config/db');

// 1. Lấy profile cá nhân (Dùng cho trang Profile khách hàng)
exports.getUserProfile = async (req, res) => {
    try {
        // ĐÃ SỬA: 'users' -> 'user' | 'name' -> 'Name' | 'email' -> 'Email'
        const [rows] = await db.query('SELECT id, Name, Email, sdt, isAdmin FROM \`user\` WHERE id = ?', [req.user.id]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Người dùng không tồn tại" });
        }
    } catch (error) {
        console.error("🔥 Lỗi tại getUserProfile:", error.message);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// Admin lấy toàn bộ danh sách người dùng (Không lọc isAdmin nữa)
exports.getAllUsers = async (req, res) => {
    try {
        // 👇 XÓA bỏ đoạn "WHERE isAdmin = 0" đi là xong
        const [users] = await db.query('SELECT id, Name, Email, sdt, isAdmin FROM \`user\`');
        
        res.json(users);
    } catch (error) {
        console.error("🔥 Lỗi tại getAllUsers:", error.message);
        res.status(500).json({ message: "Lỗi server" });
    }
};
// Cập nhật quyền Admin (0 thành 1 hoặc ngược lại)
exports.toggleAdminStatus = async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = req.body; // Giá trị mới (0 hoặc 1)
    
    try {
        // Admin duy nhất (giả định ID=1) không thể chỉnh sửa
        if (Number(id) === 1) {
            return res.status(403).json({ 
                success: false, 
                message: "⛔ Admin duy nhất (giám đốc) không thể chỉnh sửa!" 
            });
        }

        // Lấy thông tin user hiện tại
        const [userRows] = await db.query('SELECT isAdmin FROM `user` WHERE id = ?', [id]);
        
        if (!userRows.length) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        // Cập nhật quyền của user hiện tại (quản trị viên và khách hàng có thể chuyển qua lại)
        await db.query('UPDATE `user` SET isAdmin = ? WHERE id = ?', [isAdmin, id]);
        res.json({ success: true, message: "Cập nhật vai trò thành công!" });
    } catch (error) {
        console.error("🔥 Lỗi cập nhật quyền:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};