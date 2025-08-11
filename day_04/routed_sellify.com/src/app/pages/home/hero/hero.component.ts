import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  
  title = 'bootstrap_demo';
  btns  = ['Home', 'About Us ', 'Sell your mobile', 'Contact Us', 'Login'];
  

  phones = [
  {
    name: "OnePlus Aston",
    color: "Blue",
    price: 49999,
    img: "https://oasis.opstatics.com/content/dam/oasis/page/2024/global/product/aston/aston_blue.png"
  },
  {
    name: "OnePlus Aston",
    color: "Gray",
    price: 49999,
    img: "https://oasis.opstatics.com/content/dam/oasis/page/2024/global/product/aston/aston_gray.png"
  },
  {
    name: "S23 Ultra",
    color: "Black",
    price: 42999,
    img: "https://tse3.mm.bing.net/th/id/OIP.z9wswSJk-KmZGmeVdHXUTAHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "iPhone 13",
    color: "Blue",
    price: 69999,
    img: "https://thanhtaostore.com/public/upload/images/hinhsanpham/iphone-13-256gb-42311683884383.jpg"
  }
];
}