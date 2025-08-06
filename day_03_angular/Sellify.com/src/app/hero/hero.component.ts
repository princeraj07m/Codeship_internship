import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';


Swiper.use([Navigation, Autoplay]);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'] 
})
export class HeroComponent implements AfterViewInit {
  products = [
    { title: 'Ipad', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/b43b6f3f-a748-484e-9509-50847aabc289-6650287-oppo-original-imagg55sjgrashbc.webp' },
    { title: 'Watch', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/ad7600f9-b21f-4c1e-b229-347d5496c1c8-oppo_watch.webp' },
    { title: 'F27 5g', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/2da01a07-1b16-4b3f-9725-c0c7d28c1ef0-download-10.webp' },
    { title: 'Xomi 14', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/f9d1bd9f-8549-44f9-81db-4ddff0a1e817-mi_14.webp' },
    { title: 'Realme px3', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/189b01d5-02f6-4260-a9fc-ba31b4e8b40c-realme_px3.webp' },
    { title: 'Notepad', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/9c2eabf2-e70a-4e32-a999-f3e69b530e99-notepad.webp' },
    { title: 'Iphone 16', image: 'https://aayra.s3.ap-south-1.amazonaws.com/public/2025/6/0cb7635f-ea3a-4f92-bdb7-8b44351d6bcf-iphone.webp' }
  ];

  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      slidesPerView: 6,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 800,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
