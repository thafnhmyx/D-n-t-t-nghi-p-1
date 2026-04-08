const admin = (req, res, next) => {
    // req.user được lấy từ authMiddleware chạy trước đó
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Truy cập bị từ chối! Bạn không phải là Admin.' });
    }
};

module.exports = { admin };