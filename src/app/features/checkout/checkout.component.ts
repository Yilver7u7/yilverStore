import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/models/shopping-cart.store';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  // Inyecta el CartStore en el componente
  cartStore = inject(CartStore);
  private readonly _checkoutSvc = inject(CheckoutService);

  /**
   * Procede al pago enviando los productos del carrito al servicio de checkout.
   */
  onProceedToPay(): void {
    this._checkoutSvc.onProceedToPay(this.cartStore.products());
  }

  /**
   * Elimina un artículo del carrito por su ID.
   * @param id - El ID del producto a eliminar.
   */
  removeItem(id: number): void {
    this.cartStore.removeFromCart(id);
  }

  /**
   * Incrementa la cantidad de un producto en el carrito.
   * @param id - El ID del producto a incrementar.
   */
  increaseQty(id: number): void {
    const item = this.cartStore.findProductById(id);
    if (item) {
      this.cartStore.updateQuantity(id, item.qty + 1);
    }
  }

  /**
   * Decrementa la cantidad de un producto en el carrito si es mayor a 1.
   * @param id - El ID del producto a decrementar.
   */
  decreaseQty(id: number): void {
    const item = this.cartStore.findProductById(id);
    if (item && item.qty > 1) {
      this.cartStore.updateQuantity(id, item.qty - 1);
    }
  }

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * @param id - El ID del producto a actualizar.
   * @param newQty - La nueva cantidad del producto.
   */
  updateQuantity(id: number, newQty: number): void {
    if (newQty > 0) {
      this.cartStore.updateQuantity(id, newQty);
    }
  }

  /**
   * Elimina todos los artículos del carrito.
   */
  clearAll(): void {
    this.cartStore.clearCart();
  }
}
