import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styles: ``
})
export default class DetailsComponent {
  //Lo que fue enviado desde nuestra card y obtenemos de este el ID
  @Input({alias: 'id'}) productId!: number;

}
