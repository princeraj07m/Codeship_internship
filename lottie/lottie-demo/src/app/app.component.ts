import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LottieComponent, CommonModule],
})
export class AppComponent {
  animationFiles = [
    '3lakh.json',
    '15-plus.json',
    '100-percent.json',
    '365.json',
    '9000-plus.json',
    'backup.json',
    'circuit.json',
    'cloud_services.json',
    'data.json',
    'excellence.json',
    'innovation.json',
    'intergrity.json',
    'presentation-work-activity.json',
    'rfid.json',
  ];

  animationOptions: AnimationOptions[] = this.animationFiles.map(file => ({
    path: `assets/${file}`,
    autoplay: true,
    loop: true,
  }));
}