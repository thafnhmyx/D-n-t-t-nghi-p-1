/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';

// 1. Khởi tạo Context
export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPrice: 0,
  setCartItems: () => {}
});

// 2. Khởi tạo Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // 🛠 NỚI LỎNG BỘ LỌC: Chấp nhận cả variant_id hoặc id cũ để không bị mất giỏ hàng đột ngột
        return parsedCart.filter(item => item.variant_id || item.id);
      }
      return [];
    } catch (error) {
      return [];
    }
  });

  // Luôn đồng bộ vào LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // 🕵️‍♂️ LẤY MÃ ĐỊNH DANH (Ưu tiên variant_id)
    const currentId = product.variant_id || product.id;

    console.log("📥 CartContext đang xử lý sản phẩm:", product);

    if (!currentId) {
      console.error("⚠️ Không thể thêm vào giỏ vì thiếu ID sản phẩm!");
      return;
    }

    setCartItems((prev) => {
      // Tìm sản phẩm trùng dựa trên ID và Size
      const isExist = prev.find(
        (item) => (item.variant_id || item.id) === currentId && item.selectedSize === product.selectedSize
      );
      
      if (isExist) {
        // Nếu trùng: cộng dồn số lượng
        return prev.map((item) =>
          ((item.variant_id || item.id) === currentId && item.selectedSize === product.selectedSize)
            ? { ...item, qty: (Number(item.qty) || 0) + (Number(product.qty) || 1) } 
            : item
        );
      }
      
      // Nếu mới: Thêm vào mảng, đảm bảo các trường số là kiểu Number
      const newItem = {
        ...product,
        variant_id: currentId, // Ép tên về variant_id cho đồng nhất
        qty: Number(product.qty) || 1,
        price: Number(product.price) || 0
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (variant_id, selectedSize) => {
    setCartItems((prev) => 
      prev.filter((item) => !((item.variant_id || item.id) === variant_id && item.selectedSize === selectedSize))
    );
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  // LOGIC TÍNH TIỀN CHUẨN
  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return total + (price * qty);
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};