import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsService   {
  public products = signal<any[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endpoint = environment.apiURL;

  constructor(){
    this.getProducts();
  }

  // Get whole list of products
  public getProducts(): void{
    this._http.get<Product[]>(`${this._endpoint}/products/?sort=desc`)//Le damos una propiedad para que se ordenen de manera decendente
    .pipe(tap((data:any[]) => this.products.set(data)))
    .subscribe()
  }

  // Get each product by id
  public getProductById( id: number){
    return this._http.get<Product>(`${this._endpoint}/products/${id}`)
  }



}


