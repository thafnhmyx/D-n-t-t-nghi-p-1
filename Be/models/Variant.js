const db = require('../config/db');

const Variant = {
    // Lấy tất cả Size của 1 đôi giày cụ thể
    getByProductId: async (productId) => {
        const [rows] = await db.query('SELECT * FROM productsvariants WHERE ProductID = ?', [productId]);
        return rows;
    },

    // Kiểm tra tồn kho của 1 Size cụ thể
    checkStock: async (variantId) => {
        const [rows] = await db.query('SELECT quantity FROM productsvariants WHERE id = ?', [variantId]);
        return rows[0] ? rows[0].quantity : 0;
    },

    // Cập nhật kho (Trừ kho khi mua hàng)
    updateStock: async (variantId, qty) => {
        return await db.query('UPDATE productsvariants SET quantity = quantity - ? WHERE id = ?', [qty, variantId]);
    }
};

module.exports = Variant;