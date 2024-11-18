import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, Input, OnInit, Signal } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styles: ``
})
export default class DetailsComponent implements OnInit{

  //Lo que fue enviado desde nuestra card y obtenemos de este el ID
  // @Input({alias: 'id'}) productId!: number;

  //Lo usamos pero como signal, esto quiere decir que accedemos a el
  //Mediante sui fuction get
  productId = input<number>(0, { alias: 'id' });
  product!: Signal<Product | undefined>;

  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.product = this.productsService.getProductById(this.productId());
  }

  onAddToCart(){}

}
