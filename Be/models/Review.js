const db = require('../config/db');

const Review = {
    create: async (userId, rating, comment) => {
        return await db.query('INSERT INTO Review (user_id, rating, comment) VALUES (?, ?, ?)', [userId, rating, comment]);
    },
    getByProductId: async (productId) => {
        const [rows] = await db.query(
            'SELECT r.*, u.Name FROM Review r JOIN User u ON r.user_id = u.id WHERE r.product_id = ?', 
            [productId]
        );
        return rows;
    }
};

module.exports = Review;