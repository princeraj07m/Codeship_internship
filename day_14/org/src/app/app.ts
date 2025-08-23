import { Component, signal } from '@angular/core';
import 'swiper/element/bundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('org');
  categories = [
    { id: 1, name: 'Businesses' },
    { id: 2, name: 'Professionals' },
    { id: 3, name: 'Handyman' },
    { id: 4, name: 'Government' },
    { id: 5, name: 'Community' }
  ];
  selectedCategory: number | null = null; // default no selection


  recentListings = [
    { name: 'Business Name', category: "category", type: 'Listing Type', image: 'assets/recent-listing.png' },
    { name: 'Business Name', category: "category", type: 'Listing Type', image: 'assets/recent-listing.png' },
    { name: 'Business Name', category: "category", type: 'Listing Type', image: 'assets/recent-listing.png' }
  ];



  coupons = [
    {
      image: 'assets/recent-listing.png',
      location: 'Chennai',
      store: 'Store name',
      discount: '10% off',
      details: '10% off selected products on purchase',
      expiry: '30-08-2025'
    },
    {
      image: 'assets/recent-listing.png',
      location: 'Chennai',
      store: 'Store name',
      discount: '10% off',
      details: '10% off selected products on purchase',
      expiry: '30-08-2025'
    },
    {
      image: 'assets/recent-listing.png',
      location: 'Chennai',
      store: 'Store name',
      discount: '10% off',
      details: '10% off selected products on purchase',
      expiry: '30-08-2025'
    },
    {
      image: 'assets/recent-listing.png',
      location: 'Chennai',
      store: 'Store name',
      discount: '10% off',
      details: '10% off selected products on purchase',
      expiry: '30-08-2025'
    },
    {
      image: 'assets/recent-listing.png',
      location: 'Chennai',
      store: 'Store name',
      discount: '10% off',
      details: '10% off selected products on purchase',
      expiry: '30-08-2025'
    },
    {
      image: 'assets/recent-listing.png',
      location: 'Chennai',
      store: 'Store name',
      discount: '10% off',
      details: '10% off selected products on purchase',
      expiry: '30-08-2025'
    }
  ];

  couponChunks: any[] = [];

  ngOnInit() {
    this.chunkCoupons();
    window.addEventListener('resize', () => this.chunkCoupons());
  }

  chunkCoupons() {
    let chunkSize = 3; // default for desktop

    if (window.innerWidth < 576) {
      chunkSize = 1; // mobile: 1 card per slide
    } else if (window.innerWidth < 992) {
      chunkSize = 2; // tablet: 2 cards per slide
    } else {
      chunkSize = 3; // desktop: 3 cards per slide
    }

    this.couponChunks = [];
    for (let i = 0; i < this.coupons.length; i += chunkSize) {
      this.couponChunks.push(this.coupons.slice(i, i + chunkSize));
    }
  }

  sponsors = [
    { name: 'Orenda Agency', logo: 'assets/sponsor1.png' },
    { name: 'Orenda Agency', logo: 'assets/sponsor2.png' },
    { name: 'Orenda Agency', logo: 'assets/sponsor3.png' },
    { name: 'Orenda Agency', logo: 'assets/sponsor4.png' },
  ];
}

