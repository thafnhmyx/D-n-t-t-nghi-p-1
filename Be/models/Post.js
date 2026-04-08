const db = require('../config/db');

const Post = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM Post ORDER BY created_at DESC');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM Post WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = Post;