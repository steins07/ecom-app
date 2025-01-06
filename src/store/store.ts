import { Product } from "../../sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IBasketItem {
  product: Product;
  quantity: number;
}

interface IBasketState {
  items: IBasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => IBasketItem[];
}

const useBasketStore = create<IBasketState>()(
  persist(
    (set, get) => ({
      // items array
      items: [],

      // add item
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      // Remove  item
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as IBasketItem[]),
        })),

      // Clear  basket
      clearBasket: () => set({ items: [] }),

      // Get  total price
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      // Get total count of items
      getItemCount: (productId) => {
        //needs fixing
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      // Get grouped items
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    }
  )
);

export default useBasketStore;