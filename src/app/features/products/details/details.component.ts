import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, Input, OnInit, Signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/models/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styles: ``
})
export default class DetailsComponent implements OnInit{

  starsArray: number[] = new Array(5).fill(0);

  //Lo que fue enviado desde nuestra card y obtenemos de este el ID
  // @Input({alias: 'id'}) productId!: number;

  //Lo usamos pero como signal, esto quiere decir que accedemos a el
  //Mediante sui fuction get
  productId = input<number>(0, { alias: 'id' });
  product!: Signal<Product | undefined>;

  private readonly productsService = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);
  cartStore = inject( CartStore);

  ngOnInit(): void {
    this.product = this.productsService.getProductById(this.productId());
  }

  onAddToCart(): void {
    const currentProduct = this.product(); // Obtener el valor de la signal
    console.log(currentProduct)
    try {
      if (currentProduct as Product) { // Verificar si el producto no es undefined
        this.cartStore.addToCart(currentProduct as Product); // Agregar al carrito solo si es un producto válido
      } else {
        console.log("Error!")
        console.error('Product is undefined. Cannot add to cart.');
      }
    } catch (error) {
      console.log(error)
    }
  }


  generateSVG(index: number): SafeHtml {
    let svgContent = null;

    const rate = this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    } else if (index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    }
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }

}
