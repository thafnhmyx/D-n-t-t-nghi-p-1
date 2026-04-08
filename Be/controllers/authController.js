const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// 1. ĐĂNG KÝ
exports.register = async (req, res) => {
    const { username, email, password, sdt } = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO `user` (Name, Email, password, sdt) VALUES (?, ?, ?, ?)', 
            [username, email, hashedPassword, sdt || '']);
            
        res.status(201).json({ success: true, message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("🔥 Lỗi đăng ký:", error.message);
        res.status(400).json({ success: false, message: "Email đã tồn tại hoặc thiếu dữ liệu" });
    }
};

// 2. ĐĂNG NHẬP
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM `user` WHERE Email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }

        // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const secretKey = process.env.JWT_SECRET || 'chuoi_bi_mat_du_phong_cho_admin_123';
            const token = jwt.sign(
                { id: user.id, isAdmin: user.isAdmin }, 
                secretKey, 
                { expiresIn: '1d' }
            );
            
            res.json({ 
                success: true, 
                id: user.id, 
                name: user.Name, 
                email: user.Email, 
                isAdmin: user.isAdmin, 
                token 
            });
        } else {
            res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }
    } catch (error) {
        console.error("🔥 LỖI LOGIN:", error);
        res.status(500).json({ success: false, message: "Lỗi đăng nhập hệ thống" });
    }
};

// 3. QUÊN MẬT KHẨU
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM `user` WHERE Email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "Email này không tồn tại trong hệ thống!" });
        }

        // ✅ BƯỚC QUAN TRỌNG: Tạo mật khẩu tạm thời và MÃ HÓA nó
        const tempPassword = "123456";
        const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

        // ✅ Cập nhật mật khẩu đã mã hóa vào Database
        await db.query('UPDATE `user` SET password = ? WHERE Email = ?', [hashedTempPassword, email]);

        // --- CẤU HÌNH GỬI MAIL ---
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vothanhmy316@gmail.com',
                pass: 'hruv ytqs tpud gyue' 
            }
        });

        const mailOptions = {
            from: '"New Sneaker" <vothanhmy316@gmail.com>',
            to: email,
            subject: 'Khôi phục mật khẩu - New Sneaker',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #FF6B00;">Yêu cầu cấp lại mật khẩu</h2>
                    <p>Chào <b>${users[0].Name}</b>,</p>
                    <p>Mật khẩu của bạn đã được đặt lại thành công.</p>
                    <p>Mật khẩu tạm thời mới của bạn là: <b style="font-size: 18px; color: #000;">${tempPassword}</b></p>
                    <p>Vui lòng đăng nhập và <b>đổi mật khẩu ngay</b> trong trang cá nhân để đảm bảo an toàn.</p>
                    <br />
                    <p>Trân trọng,<br/>Đội ngũ New Sneaker</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: "Mật khẩu mới đã được gửi vào Email của bạn!" });
        } catch (mailError) {
            console.error("⚠️ Lỗi gửi mail:", mailError.message);
            res.status(500).json({ success: false, message: "Không thể gửi mail, nhưng mật khẩu đã được reset về 123456" });
        }

    } catch (error) {
        console.error("🔥 Lỗi ForgotPassword:", error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};

// 4. LẤY THÔNG TIN CÁ NHÂN
exports.getMe = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, Name, Email, sdt, isAdmin FROM `user` WHERE id = ?', [req.user.id]);
        if (users.length > 0) {
            res.json({ success: true, user: users[0] });
        } else {
            res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi lấy thông tin" });
    }
};