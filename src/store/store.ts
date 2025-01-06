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
        (set, get) => (
            {
                // array for basker items
                items: [],

                // add item to basket
                addItem: (product) =>
                    set((state) => {
                        const existingItem = state.items.find(
                            item => item.product._id === product._id
                        );
                        if (existingItem) {
                            return {
                                items: state.items.map((item) => item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
                            };
                        }
                        else {
                            return {
                                items: [...state.items, { product, quantity: 1 }]
                            }
                        }
                    }),

                // remove item from basket
                removeItem: (productId) =>
                    set((state) => ({
                        items: state.items.reduce((acc, item) => {
                            if (item.product._id === productId) {
                                if (item.quantity > 1) {
                                    acc.push({ ...item, quantity: item.quantity - 1 })
                                }
                            }
                            else {
                                acc.push(item);
                            }
                            return acc;
                        }, [] as IBasketItem[]
                        )
                    })),

                // clear basket
                clearBasket: () => set({ items: [] }),

                // get total price
                getTotalPrice: () => {
                    return get().items.reduce(
                        (total, item) => total + (item.product.price ?? 0) * item.quantity, 0
                    );
                },

                // get total item count
                getItemCount: (productId) => {
                    const items = get().items.find(item => item.product._id === productId);
                    return items ? items.quantity : 0;
                },

                // get grouped items
                getGroupedItems: () => get().items,
            }
        ),
        {
            name: "basket-store",
        }
    )
);

export default useBasketStore;