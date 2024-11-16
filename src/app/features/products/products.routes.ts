import { Routes} from '@angular/router';

 const route: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component')
  },
  {
    path: ':id',
    loadComponent: () => import('./details/details.component')
  }
]

export default route;






