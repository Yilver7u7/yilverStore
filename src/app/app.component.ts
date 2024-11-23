import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './api/products.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./layaout/header/header.component";
import SpinnerComponent from "./shared/components/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yilverStore';
  //This is just to verify that the API works correctly

  // We have finished the test
  // //Instancia de una inyecccion de dependecia
  // private readonly ProductSvc = inject(ProductsService);
  // // resultado de hacer uso del metodo en nuestro services en una variable
  // products = this.ProductSvc.products;

}
