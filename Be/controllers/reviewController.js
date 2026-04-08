const db = require('../config/db');

// 1. Gửi đánh giá mới
exports.createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    try {
        await db.query(
            'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
            [req.user.id, productId, rating, comment]
        );
        res.status(201).json({ success: true, message: "Đánh giá thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Lấy danh sách đánh giá của một sản phẩm
exports.getProductReviews = async (req, res) => {
    try {
        const [reviews] = await db.query(
            'SELECT reviews.*, users.name FROM reviews JOIN users ON reviews.user_id = users.id WHERE product_id = ?',
            [req.params.productId]
        );
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};