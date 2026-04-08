const db = require('../config/db');

const Order = {
    // 1. TẠO ĐƠN HÀNG
    create: async (userId, totalMoney, paymentMethod, fullname, phone, address) => {
        try {
            const [result] = await db.query(
                'INSERT INTO `order` (user_id, total_money, payment_method, payment_status, order_status, fullname, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, totalMoney, paymentMethod, 'Unpaid', 'Pending', fullname, phone, address]
            );
            return result.insertId;
        } catch (error) {
            console.error("🔥 Lỗi tại Order.create (Model):", error.message);
            throw error;
        }
    },

    // 2. THÊM CHI TIẾT (Lưu ý tên cột: product_variant_id)
    createDetail: async (orderId, variantId, qty, price) => {
        try {
            // Đảm bảo tên cột trong DB của bạn là product_variant_id
            return await db.query(
                'INSERT INTO `orderdetail` (order_id, product_variant_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, variantId, qty, price]
            );
        } catch (error) {
            console.error("🔥 Lỗi tại Order.createDetail (Model):", error.message);
            throw error;
        }
    },

    // 3. LỊCH SỬ ĐƠN HÀNG
    getByUserId: async (userId) => {
        try {
            const [rows] = await db.query(
                'SELECT * FROM `order` WHERE user_id = ? ORDER BY created_at DESC', 
                [userId]
            );
            return rows;
        } catch (error) {
            console.error("🔥 Lỗi tại Order.getByUserId (Model):", error.message);
            throw error;
        }
    }
};

module.exports = Order;