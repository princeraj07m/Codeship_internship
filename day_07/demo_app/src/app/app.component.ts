import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PipeComponent } from './pipe/pipe.component';
import { formatCurrency } from '@angular/common';
import { FormValidationComponent } from './form-validation/form-validation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PipeComponent , FormValidationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo_app';
}
