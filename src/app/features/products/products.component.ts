import { Component, inject } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { ProductsService } from '@api/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styles: ``
})
export default class ProductsComponent {

  //Other way to see the inject
  // constructor(
  //   private productsService: ProductsService
  // ){}
  // pepe = this.productsService.products;


  private readonly productSvc = inject( ProductsService);
  products = this.productSvc.products;

}
