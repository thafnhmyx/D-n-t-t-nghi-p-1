const db = require('../config/db');

const Address = {
    create: async (userId, phone, adress) => {
        return await db.query('INSERT INTO Address (user_id, phone, adress) VALUES (?, ?, ?)', [userId, phone, adress]);
    },
    getByUserId: async (userId) => {
        const [rows] = await db.query('SELECT * FROM Address WHERE user_id = ?', [userId]);
        return rows;
    }
};

module.exports = Address;