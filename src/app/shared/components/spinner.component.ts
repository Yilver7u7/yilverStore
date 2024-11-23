import { Component, inject } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
})
export default class SpinnerComponent {
  private readonly spinnerSvc = inject(SpinnerService);
  isLoading = this.spinnerSvc.isLoading;
}
