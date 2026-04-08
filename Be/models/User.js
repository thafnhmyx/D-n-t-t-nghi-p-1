const db = require('../config/db');

const User = {
    // Tìm người dùng theo Email (Dùng cho Login)
    findByEmail: async (email) => {
        // Đã đổi User thành `user`
        const [rows] = await db.query('SELECT * FROM `user` WHERE Email = ?', [email]);
        return rows[0];
    },

    // Tìm người dùng theo ID (Dùng cho Profile)
    findById: async (id) => {
        // Đã đổi User thành `user`
        const [rows] = await db.query('SELECT id, Name, Email, sdt, isAdmin FROM `user` WHERE id = ?', [id]);
        return rows[0];
    },

    // Tạo người dùng mới (Dùng cho Register)
    create: async (name, email, sdt, hashedPassword) => {
        // Đã đổi User thành `user`
        const [result] = await db.query(
            'INSERT INTO `user` (Name, Email, sdt, password) VALUES (?, ?, ?, ?)',
            [name, email, sdt, hashedPassword]
        );
        return result.insertId;
    },

    // Lấy tất cả người dùng (Dành cho Admin)
    getAll: async () => {
        // Đã đổi User thành `user`
        const [rows] = await db.query('SELECT id, Name, Email, sdt, isAdmin FROM `user`');
        return rows;
    }
};

module.exports = User;