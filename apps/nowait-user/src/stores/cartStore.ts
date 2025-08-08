import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartType } from "../types/order/cart";

interface CartState {
  cart: CartType[];
  increaseQuantity: (id: number, price: number) => void;
  decreaseQuantity: (id: number, price: number) => void;
  addToCart: (item: CartType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      // 메뉴 수량 증가
      increaseQuantity: (id, price) =>
        set(({ cart }) => ({
          cart: cart.map((item) => {
            return item.menuId === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  price: item.price + price,
                }
              : item;
          }),
        })),
      //메뉴 수량 감소
      decreaseQuantity: (id, price) =>
        set(({ cart }) => ({
          cart: cart.map((item) => {
            return item.menuId === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  price: item.price - price,
                }
              : item;
          }),
        })),
      //메뉴 추가(같은 메뉴가 있다면 기존 수량에 합산, 없으면 새 메뉴 추가)
      addToCart: (item) =>
        set(({ cart }) => {
          const existingIndex = cart.findIndex(
            (cartItem) => cartItem.menuId === item.menuId
          );
          if (existingIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingIndex] = {
              ...updatedCart[existingIndex],
              price : updatedCart[existingIndex].price + item.price,
              quantity: updatedCart[existingIndex].quantity + item.quantity,
            };
            return { cart: updatedCart }; // 수량 변경
          } else {
            return { cart: [...cart, item] }; // 새 메뉴 추가
          }
        }),
      // 메뉴 삭제
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.menuId !== id),
        })),
      // 장바구니 전체 삭제(key는 남아있고, value만 삭제)
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
