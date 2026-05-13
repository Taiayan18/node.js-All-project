import { createContext, useContext, useMemo, useState } from "react";
import { products } from "../data/products";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      return [...prev, { ...product, qty }];
    });
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const updateQty = (id, qty) => setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  const clearCart = () => setCart([]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  return <CartContext.Provider value={{ cart, products, addToCart, removeFromCart, updateQty, clearCart, total, count }}>{children}</CartContext.Provider>;
};
export const useCart = () => useContext(CartContext);
