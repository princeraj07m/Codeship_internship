import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sionic_web');
     
}
