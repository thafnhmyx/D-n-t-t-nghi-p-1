const Order = require('../models/Order');
const db = require('../config/db');

// ==========================================================
// 1. TẠO ĐƠN HÀNG MỚI VÀ TRỪ TỒN KHO
// ==========================================================
exports.createOrder = async (req, res) => {
    const { 
        user_id, 
        total_money, 
        payment_method, 
        items, 
        fullname, 
        phone,    
        address   
    } = req.body;

    try {
        // Bước 1: Lưu thông tin chung vào bảng `order`
        const orderId = await Order.create(
            user_id, 
            total_money, 
            payment_method, 
            fullname, 
            phone, 
            address
        );

        // Bước 2: Lưu chi tiết đơn hàng VÀ Trừ số lượng tồn kho
        if (items && items.length > 0) {
            for (const item of items) {
                // Lấy ID của Size (variant_id)
                const variantIdToSave = item.variant_id || item.product_variant_id || item.id;
                
                if (!variantIdToSave) {
                    throw new Error("Không tìm thấy ID biến thể sản phẩm (variant_id)!");
                }

                // 2.1 - Lưu vào bảng `orderdetail`
                await Order.createDetail(orderId, variantIdToSave, item.quantity, item.price);

                // 2.2 - Trừ tồn kho trực tiếp ở bảng `productsvariants`
                await db.query(
                    "UPDATE `productsvariants` SET quantity = quantity - ? WHERE id = ?",
                    [item.quantity, variantIdToSave]
                );
            }
        }

        res.status(201).json({ 
            success: true, 
            message: "Tạo đơn hàng thành công!", 
            orderId: orderId 
        });

    } catch (error) {
        console.error("🔥 Lỗi tại createOrder:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==========================================================
// 2. CHI TIẾT ĐƠN HÀNG (ĐÃ FIX TÊN CỘT PHONE_NUMBER)
// ==========================================================
exports.getOrderDetails = async (req, res) => {
    const { id } = req.params; 
    try {
        const sql = `
            SELECT 
                od.quantity, 
                od.price, 
                pv.size, 
                p.name AS name, 
                p.name AS product_name, 
                p.image AS image, 
                p.image AS product_image,
                o.fullname,
                o.phone_number,  -- 👉 FIX TẠI ĐÂY: Sửa o.phone thành o.phone_number cho đúng database
                o.address
            FROM \`orderdetail\` od 
            JOIN \`productsvariants\` pv ON od.product_variant_id = pv.id 
            JOIN \`products\` p ON pv.ProductID = p.id 
            JOIN \`order\` o ON od.order_id = o.id
            WHERE od.order_id = ?`;
        
        const [rows] = await db.query(sql, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy dữ liệu đơn hàng" });
        }

        res.json(rows);
    } catch (error) { 
        console.error("🔥 Lỗi lấy chi tiết:", error.message);
        res.status(500).json({ message: "Lỗi hệ thống khi lấy chi tiết đơn" }); 
    }
};

// ==========================================================
// 3. LẤY TẤT CẢ ĐƠN HÀNG (DÀNH CHO ADMIN)
// ==========================================================
exports.getOrders = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM `order` ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) { 
        console.error("🔥 Lỗi getOrders:", error.message);
        res.status(500).json({ message: "Lỗi lấy danh sách đơn hàng cho Admin" }); 
    }
};

// ==========================================================
// 4. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (ADMIN/USER HỦY)
// ==========================================================
exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE `order` SET order_status = ? WHERE id = ?', [status, id]);
        res.json({ success: true, message: "Cập nhật trạng thái thành công" });
    } catch (error) { 
        console.error("🔥 Lỗi updateStatus:", error.message);
        res.status(500).json({ error: error.message }); 
    }
};

// ==========================================================
// 5. LẤY ĐƠN THEO USER (DÙNG CHO TRANG LỊCH SỬ ĐƠN HÀNG)
// ==========================================================
exports.getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const sql = `
            SELECT 
                o.*, 
                (
                    SELECT GROUP_CONCAT(
                        CONCAT(
                            '{"name":"', REPLACE(p.name, '"', '\\"'), 
                            '","image":"', p.image, 
                            '","size":"', pv.size, 
                            '","quantity":', od.quantity, '}'
                        )
                    )
                    FROM \`orderdetail\` od
                    JOIN \`productsvariants\` pv ON od.product_variant_id = pv.id
                    JOIN \`products\` p ON pv.ProductID = p.id
                    WHERE od.order_id = o.id
                ) AS items_string
            FROM \`order\` o
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `;
        
        const [rows] = await db.query(sql, [userId]);

        const formattedRows = rows.map(row => {
            let items = [];
            if (row.items_string) {
                try {
                    items = JSON.parse("[" + row.items_string + "]");
                } catch (e) {
                    console.error("Lỗi parse JSON items:", e);
                    items = [];
                }
            }
            return { ...row, items };
        });

        res.json(formattedRows);
    } catch (error) {
        console.error("🔥 Lỗi SQL History:", error.message);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// Dự phòng: Export thêm tên này phòng trường hợp file Router của bạn đang gọi tên cũ
exports.getOrdersByUser = exports.getOrdersByUserId;