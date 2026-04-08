const mysql = require('mysql2');
require('dotenv').config();

// Tạo pool kết nối để tối ưu hiệu suất (không bị ngắt kết nối giữa chừng)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối khi khởi động
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Lỗi kết nối MySQL:', err.message);
    } else {
        console.log('✅ Kết nối database MySQL thành công!');
        connection.release();
    }
});

// Xuất ra dưới dạng promise để dùng async/await cho mượt
module.exports = db.promise();