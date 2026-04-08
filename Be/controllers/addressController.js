const db = require('../config/db');

// Thêm địa chỉ mới
exports.addAddress = async (req, res) => {
    const { phone, adress } = req.body;
    try {
        await db.query(
            'INSERT INTO Address (user_id, phone, adress) VALUES (?, ?, ?)',
            [req.user.id, phone, adress]
        );
        res.status(201).json({ message: "Thêm địa chỉ thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi thêm địa chỉ" });
    }
};

// Lấy danh sách địa chỉ của tôi
exports.getMyAddresses = async (req, res) => {
    try {
        const [addresses] = await db.query('SELECT * FROM Address WHERE user_id = ?', [req.user.id]);
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy địa chỉ" });
    }
};