import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';


Swiper.use([Navigation, Autoplay]);

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  products = [
  { name: "Ram",star :4, feedback: "Quick service and smooth process for selling my old phone." },
  { name: "Ram",star :3, feedback: "Great pricing and hassle-free pickup experience." },
  { name: "Sita",star :5, feedback: "Very easy to sell my phone, and the payment was instant." },
  { name: "Laxman",star :3, feedback: "Loved how simple and transparent the selling process was." },
  { name: "Hanuman",star :4, feedback: "Customer support was responsive and the deal was fair." },
  { name: "Bharat",star :3, feedback: "The entire process took less than 30 minutes, very convenient." },
  { name: "Shatrughna",star :4, feedback: "Best platform I've used to sell old gadgets, highly recommended." },
  { name: "Ram",star :5, feedback: "Pickup was on time and payment credited within minutes." },
  { name: "Sita",star :4, feedback: "No hidden charges and a very smooth user experience." },
  { name: "Laxman",star :4, feedback: "Got a better price than other websites I checked, really happy." },
];

rate(){
  
}
  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
