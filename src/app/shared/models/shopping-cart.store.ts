import { computed } from "@angular/core";
import { patchState, signalStore, withMethods, withState, withComputed } from "@ngrx/signals";
import { Product } from "./product.interface";

/**
 * Interface defining the structure of the CartStore state.
 * - `products`: Array of Product objects currently in the cart.
 * - `totalAmount`: Total amount of all products in the cart.
 * - `productsCount`: Total number of products in the cart.
 */
export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

/**
 * Initial state for the CartStore, setting default values for all properties.
 */
const initialState: CartStore = {
  products: [], // No products in the cart initially
  totalAmount: 0, // Total amount is zero by default
  productsCount: 0, // No products counted initially
};

/**
 * Signal-based state management store for managing the cart.
 * Includes:
 * - State management (`withState`).
 * - Computed properties (`withComputed`) to calculate derived data.
 * - Methods (`withMethods`) for adding, removing, and clearing cart items.
 */
export const CartStore = signalStore(
  { providedIn: "root" }, // Store is provided at the root level of the application
  withState(initialState), // Initializes the state with the initial values
  withComputed(({ products }) => ({
    /**
     * Computed property to calculate the total number of products in the cart.
     * Recalculates whenever `products` changes.
     */
    productsCount: computed(() => calculateProductCount(products())),

    /**
     * Computed property to calculate the total amount in the cart.
     * Recalculates whenever `products` changes.
     */
    totalAmount: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }) => ({
    /**
     * Adds a new product to the cart or updates its quantity if it's already in the cart.
     * @param product - The product to add to the cart.
     */
    addToCart(product: Product) {
      const existingProduct = products().find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.qty++;
        existingProduct.subtotal = existingProduct.qty * existingProduct.price;
      } else {
        patchState(store, { products: [...products(), product] });
      }

      patchState(store, { products: [...products()] }); // Ensure state update
    },

    /**
     * Removes a product from the cart by its ID.
     * @param id - The ID of the product to remove.
     */
    removeFromCart(id: number) {
      const updatedProducts = products().filter((product) => product.id !== id);
      patchState(store, { products: updatedProducts });
    },

    /**
     * Clears all items from the cart, resetting the state to its initial values.
     */
    clearCart() {
      patchState(store, initialState);
    },

    /**
     * Updates the quantity of a product in the cart.
     * @param id - The ID of the product to update.
     * @param newQty - The new quantity of the product.
     */
    updateQuantity(id: number, newQty: number) {
      const updatedProducts = products().map((product) =>
        product.id === id
          ? { ...product, qty: newQty, subtotal: product.price * newQty }
          : product
      );
      patchState(store, { products: updatedProducts });
    },

    /**
     * Finds a product in the cart by its ID.
     * @param id - The ID of the product to find.
     * @returns The product if found, undefined otherwise.
     */
    findProductById(id: number): Product | undefined {
      return products().find((product) => product.id === id);
    },
  }))
);

/**
 * Calculates the total count of products in the cart.
 * @param products - The array of products in the cart.
 * @returns The total number of products in the cart.
 */
function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0);
}

/**
 * Calculates the total amount of all products in the cart.
 * @param products - The array of products in the cart.
 * @returns The total amount of all products in the cart.
 */
function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0);
}
