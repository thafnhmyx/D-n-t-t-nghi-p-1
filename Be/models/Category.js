const db = require('../config/db');

const Category = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM Categories');
        return rows;
    }
};

module.exports = Category;