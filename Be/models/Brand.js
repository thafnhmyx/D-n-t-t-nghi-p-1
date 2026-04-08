const db = require('../config/db');

const Brand = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM Brand');
        return rows;
    }
};

module.exports = Brand;