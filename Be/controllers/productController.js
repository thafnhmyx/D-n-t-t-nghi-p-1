const db = require('../config/db');

// 1. Lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
    try {
        const isAdminRequest = req.query.isAdmin === 'true';
        const { categoryId, brandId, sort } = req.query;

        let sql = `
            SELECT p.*, b.name as brand_name, c.Name as category_name 
            FROM \`products\` p
            LEFT JOIN \`brand\` b ON p.brand_id = b.id
            LEFT JOIN \`categories\` c ON p.category_id = c.id
            WHERE 1=1
        `;
        
        const params = [];

        if (!isAdminRequest) {
            sql += ` AND p.status = 'Available' `; 
            sql += ` AND p.status = 'Available' AND b.status = 'Available' AND c.status = 'Available' `;
        }

        if (categoryId && categoryId !== 'null' && categoryId !== 'undefined') {
            sql += ` AND p.category_id = ? `;
            params.push(categoryId);
        }

        if (brandId && brandId !== 'null' && brandId !== 'undefined') {
            sql += ` AND p.brand_id = ? `;
            params.push(brandId);
        }

        if (sort === 'price-asc') {
            sql += ` ORDER BY p.price ASC `;
        } else if (sort === 'price-desc') {
            sql += ` ORDER BY p.price DESC `;
        } else {
            sql += ` ORDER BY p.id DESC `; 
        }

        const [products] = await db.query(sql, params);

        // Ép kiểu price về Number để Frontend tính toán chuẩn
        const formattedProducts = products.map(p => ({
            ...p,
            price: Number(p.price)
        }));

        res.json(formattedProducts);
    } catch (error) {
        console.error("🔥 Lỗi SQL getProducts:", error.message);
        res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" });
    }
};

// 2. Lấy chi tiết sản phẩm (ĐỒNG BỘ variant_id VỚI FRONTEND)
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [productRows] = await db.query('SELECT * FROM `products` WHERE id = ?', [id]);
        
        // 💡 variant_id này sẽ khớp với logic trong CartContext và ProductDetail
        const [variantRows] = await db.query(
            'SELECT id AS variant_id, ProductID, size, quantity FROM `productsvariants` WHERE ProductID = ?', 
            [id]
        );
        
        if (productRows.length > 0) {
            const product = {
                ...productRows[0],
                price: Number(productRows[0].price), // Đảm bảo giá là số
                variants: variantRows
            };
            res.json(product);
        } else {
            res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
    } catch (error) {
        console.error("🔥 Lỗi SQL tại getProductById:", error.message);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// 3. Thêm sản phẩm mới 
exports.addProduct = async (req, res) => {
    const { name, price, category_id, brand_id, description } = req.body;
    const image = req.file ? req.file.filename : '';
    const gender = 'Unisex'; 

    try {
        const sqlProduct = `INSERT INTO \`products\` (brand_id, category_id, name, price, description, image, status, gender, created_at) 
                            VALUES (?, ?, ?, ?, ?, ?, 'Available', ?, NOW())`;
        const [result] = await db.query(sqlProduct, [brand_id, category_id, name, price, description, image, gender]);
        
        const newProductId = result.insertId; 

        // Tự động tạo size từ 39-43 cho sản phẩm mới
        const sqlVariants = `
            INSERT INTO \`productsvariants\` (\`ProductID\`, \`size\`, \`quantity\`) 
            VALUES (?, '39', 20), (?, '40', 20), (?, '41', 20), (?, '42', 20), (?, '43', 20)
        `;
        await db.query(sqlVariants, [newProductId, newProductId, newProductId, newProductId, newProductId]);

        res.status(201).json({ success: true, message: "Thêm sản phẩm thành công!" });
    } catch (error) {
        console.error("🔥 Lỗi SQL addProduct:", error.message);
        res.status(500).json({ message: "Lỗi khi thêm sản phẩm" });
    }
};

// 4. Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { brand_id, category_id, name, price, description, gender, status } = req.body;
    try {
        let finalImage;
        if (req.file) {
            finalImage = req.file.filename;
        } else {
            const [currentProduct] = await db.query('SELECT image FROM `products` WHERE id = ?', [id]);
            finalImage = currentProduct[0]?.image || '';
        }
        
        const sql = `UPDATE \`products\` SET brand_id=?, category_id=?, name=?, price=?, description=?, image=?, gender=?, status=? WHERE id=?`;
        await db.query(sql, [brand_id, category_id, name, price, description, finalImage, gender || 'Unisex', status || 'Available', id]);
        
        res.json({ success: true, message: "Cập nhật thành công" });
    } catch (error) {
        console.error("🔥 Lỗi SQL updateProduct:", error.message);
        res.status(500).json({ message: "Lỗi cập nhật" });
    }
};

// 5. Bật/Tắt ẩn hiện sản phẩm
exports.toggleProductStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT status FROM `products` WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Sản phẩm không tồn tại" });

        const newStatus = (rows[0].status === 'Hidden') ? 'Available' : 'Hidden';
        await db.query("UPDATE `products` SET status = ? WHERE id = ?", [newStatus, id]);
        res.json({ success: true, status: newStatus });
    } catch (error) {
        console.error("🔥 Lỗi SQL toggleStatus:", error.message);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// 6. Xóa sản phẩm vĩnh viễn
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Xóa variants trước tránh lỗi khóa ngoại
        await db.query("DELETE FROM `productsvariants` WHERE ProductID = ?", [id]);
        await db.query("DELETE FROM `products` WHERE id = ?", [id]);
        
        res.json({ success: true, message: "Đã xóa sản phẩm" });
    } catch (error) {
        console.error("🔥 Lỗi SQL deleteProduct:", error.message);
        res.status(500).json({ message: "Lỗi khi xóa" });
    }
};