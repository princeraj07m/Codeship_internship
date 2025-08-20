import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdCarouselPause } from "../../ngbd-carousel-pause/ngbd-carousel-pause"; 

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgbModule, NgbdCarouselPause],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  images = [
    "https://tse2.mm.bing.net/th/id/OIP.NR9MV7uAIX9B1f16mQVe7wHaEG?pid=Api&P=0&h=180",
    "https://tse1.mm.bing.net/th/id/OIP.yLf7kQVaLpxqCZX1VRHw-wHaEK?pid=Api&P=0&h=180"

  ]
}
