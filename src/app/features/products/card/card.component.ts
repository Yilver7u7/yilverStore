import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
  product = input.required<Product>();
  // @Input({ required: true}) productOld!: Product;

  //Enviamos nuestro object
  @Output() addToCartEvent = new EventEmitter<Product>();
  onAddToCart(): void {
    this.addToCartEvent.emit(this.product());
  }

}
