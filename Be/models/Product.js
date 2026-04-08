const db = require('../config/db');

const Product = {
    // Lấy toàn bộ sản phẩm kèm tên Thương hiệu và Danh mục
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT p.*, b.name as brand_name, c.Name as category_name 
            FROM Products p
            LEFT JOIN Brand b ON p.brand_id = b.id
            LEFT JOIN Categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC
        `);
        return rows;
    },

    // Lấy chi tiết 1 sản phẩm
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM Products WHERE id = ?', [id]);
        return rows[0];
    },

    // Tìm kiếm sản phẩm theo tên
    searchByName: async (keyword) => {
        const [rows] = await db.query('SELECT * FROM Products WHERE name LIKE ?', [`%${keyword}%`]);
        return rows;
    }
};

module.exports = Product;