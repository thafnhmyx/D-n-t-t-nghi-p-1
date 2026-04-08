const db = require('../config/db');
const crypto = require('crypto');

// 1. HÀM XỬ LÝ (GIỮ NGUYÊN)
exports.processPayment = async (req, res) => {
    const { orderId, paymentMethod } = req.body;
    try {
        const [order] = await db.query('SELECT * FROM `Order` WHERE id = ?', [orderId]);
        if (order.length === 0) return res.status(404).json({ message: "Không tìm thấy đơn" });
        const paymentStatus = (paymentMethod === 'COD') ? 'Pending' : 'Paid';
        await db.query(
            'UPDATE `Order` SET payment_method = ?, payment_status = ?, order_status = ? WHERE id = ?',
            [paymentMethod, paymentStatus, 'Processing', orderId]
        );
        res.json({ success: true, message: "Thành công!", status: paymentStatus });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xử lý" });
    }
};

// 2. API TẠO LINK VNPAY - ĐÃ CẬP NHẬT TÀI KHOẢN MỚI
exports.createPaymentUrl = (req, res) => {
    try {
        // 👉 ĐÃ THAY BẰNG MÃ MỚI CỦA VINH
        const tmnCode = "KXR8U3V9"; 
        const secretKey = "ZI9T3RCBG00RWSIAK5C3T4WNQYFCFNP6"; 
        const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const returnUrl = "http://localhost:5173/order-success"; 

        const date = new Date();
        const pad = (n) => n < 10 ? '0' + n : n;
        const vnp_CreateDate = date.getFullYear() + 
                               pad(date.getMonth() + 1) + 
                               pad(date.getDate()) + 
                               pad(date.getHours()) + 
                               pad(date.getMinutes()) + 
                               pad(date.getSeconds());

        const vnp_TxnRef = "BILL" + date.getTime();
        const amount = req.body.amount || 7400000;

        let vnp_Params = {
            'vnp_Version': '2.1.0',
            'vnp_Command': 'pay',
            'vnp_TmnCode': tmnCode,
            'vnp_Locale': 'vn',
            'vnp_CurrCode': 'VND',
            'vnp_TxnRef': vnp_TxnRef,
            'vnp_OrderInfo': 'ThanhToanDonHang', 
            'vnp_OrderType': 'other',
            'vnp_Amount': String(amount * 100),
            'vnp_ReturnUrl': returnUrl,
            'vnp_IpAddr': '127.0.0.1', 
            'vnp_CreateDate': vnp_CreateDate
        };

        // Bước 1: Sắp xếp bộ tham số theo Alphabet
        const keys = Object.keys(vnp_Params).sort();
        
        // Bước 2: ENCODE (Mã hóa) toàn bộ giá trị trước khi tạo chữ ký để FIX LỖI SAI CHỮ KÝ
        const sortedParams = {};
        keys.forEach(key => {
            sortedParams[key] = encodeURIComponent(vnp_Params[key]).replace(/%20/g, "+");
        });

        // Bước 3: Nối chuỗi tạo chữ ký
        const signData = Object.keys(sortedParams).map(key => {
            return key + '=' + sortedParams[key];
        }).join('&');

        // Bước 4: Tạo chữ ký SHA512
        const crypto = require('crypto'); // Đảm bảo gọi thư viện crypto
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        // Bước 5: Nối chuỗi URL cuối cùng
        const finalUrl = vnpUrl + "?" + signData + "&vnp_SecureHash=" + signed;

        console.log("-----------------------------------------");
        console.log("✅ LINK VNPAY TÀI KHOẢN MỚI CHUẨN XÁC:");
        console.log(finalUrl);
        console.log("-----------------------------------------");

        res.json({ vnpUrl: finalUrl });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};