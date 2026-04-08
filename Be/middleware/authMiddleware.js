const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Kiểm tra xem token có nằm trong Header (Bearer Token) không
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Giải mã token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Lưu thông tin user vào req để các controller sau sử dụng
            req.user = decoded; 
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'Không có quyền truy cập, token sai!' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Bạn chưa đăng nhập, không có token!' });
    }
};

module.exports = { protect };