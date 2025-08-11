import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Routed_sellify';
  btns = [
    { name: 'Home', value: 'home' },
    { name: 'About Us', value: 'blog' },
    { name: 'Sell your mobile', value: 'sell-your-mobile' },
    { name: 'Contact Us', value: 'contact-us' },
    { name: 'Login', value: 'login' },
  ];

  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
