import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable, runInInjectionContext, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { tap, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({providedIn: 'root'})
export class ProductsService   {
  public products = signal<any[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor(){
    this.getProducts();
  }

  // Get whole list of products
  public getProducts(): void{
    this._http.get<Product[]>(`${this._endPoint}/products/?sort=desc`)//Le damos una propiedad para que se ordenen de manera decendente
    .pipe(
      map( ( products: Product[]) => products.map( (product:Product) => ( {...product,qty:1} ))),
      tap((products:Product[]) => this.products.set(products)))
    .subscribe()
  }

  // Get each product by id
  // public getProductById( id: number){
     // const product$ = this._http.get<Product>(`${this._endpoint}/products/${id}`)

     // return toSignal(product$);

  //   return runInInjectionContext( this._injector, ()=>
  //    this._http.get<Product>(`${this._endpoint}/products/${id}`))
  // }
  public getProductById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/products/${id}`)
      )
    );


}
}

