import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '@shared/models/shopping-cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, CurrencyPipe, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showCart = signal<boolean>(false);
  cartStore = inject(CartStore);
}
