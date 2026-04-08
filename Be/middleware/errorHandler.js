const errorHandler = (err, req, res, next) => {
    // Nếu status code là 200 (thành công) mà lại nhảy vào lỗi thì gán mặc định 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Chỉ hiện chi tiết lỗi (stack) khi ở môi trường phát triển (development)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };