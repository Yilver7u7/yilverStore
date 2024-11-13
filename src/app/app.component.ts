import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './api/products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yilverStore';
  //This is just to verify that the API works correctly

  //Instancia de una inyecccion de dependecia
  private readonly ProductSvc = inject(ProductsService);
  // resultado de hacer uso del metodo en nuestro services en una variable
  products = this.ProductSvc.products;

}
