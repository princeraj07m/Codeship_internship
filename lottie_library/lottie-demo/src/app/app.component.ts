import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import type { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LottieComponent, CommonModule],
})
export class AppComponent {
  animationFiles = [
    '9000-plus.json',
    'circuit.json',
    'cloud_services.json',
  ];
  auto : boolean = false;

  animations: AnimationItem[] = [];

  animationCreated(animation: AnimationItem, index: number) {
    this.animations[index] = animation;
  }

  play(index: number) {
    this.animations[index]?.play();
  }

  stop(index: number) {
    this.animations[index]?.stop();
  }
animationOptions: AnimationOptions[] = this.animationFiles.map(file => ({
    path: `assets/${file}`,
    autoplay: this.auto,
    loop: true,
  }));
  
}