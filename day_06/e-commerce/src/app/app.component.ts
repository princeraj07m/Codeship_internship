import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cart_open :boolean = false;
  showcart () {
    this.cart_open = !this.cart_open;
  }
  title = 'e-commerce';
    cartitemcount = 0;

     items: any[] = [
    // name , desc , price , img

    {
      name: 'Wireless Headphones',
      desc: 'Noise-cancelling over-ear headphones with Bluetooth.',
      price: 99,
      img: 'https://via.placeholder.com/150?text=Headphones',
    },
    {
      name: 'Smart Watch',
      desc: 'Fitness tracker with heart rate monitor.',
      price: 149,
      img: 'https://via.placeholder.com/150?text=Smart+Watch',
    },
    {
      name: 'Leather Wallet',
      desc: 'Elegant brown leather wallet with multiple card slots.',
      price: 39,
      img: 'https://via.placeholder.com/150?text=Wallet',
    },
    {
      name: 'Bluetooth Speaker',
      desc: 'Portable waterproof Bluetooth speaker.',
      price: 55,
      img: 'https://via.placeholder.com/150?text=Speaker',
    },
    {
      name: 'Gaming Mouse',
      desc: 'Ergonomic mouse with adjustable DPI.',
      price: 29,
      img: 'https://via.placeholder.com/150?text=Mouse',
    },
    {
      name: 'Laptop Backpack',
      desc: 'Durable backpack fits laptops up to 15 inches.',
      price: 49,
      img: 'https://via.placeholder.com/150?text=Backpack',
    },
    {
      name: 'Action Camera',
      desc: '4K waterproof action camera for adventure.',
      price: 89,
      img: 'https://via.placeholder.com/150?text=Action+Camera',
    },
    {
      name: 'Yoga Mat',
      desc: 'Non-slip yoga mat for all types of exercises.',
      price: 25,
      img: 'https://via.placeholder.com/150?text=Yoga+Mat',
    },
    {
      name: 'Sunglasses',
      desc: 'UV protection polarized sunglasses.',
      price: 19,
      img: 'https://via.placeholder.com/150?text=Sunglasses',
    },
    {
      name: 'Coffee Maker',
      desc: 'Automatic drip coffee maker with timer.',
      price: 65,
      img: 'https://via.placeholder.com/150?text=Coffee+Maker',
    },
    {
      name: 'USB-C Charger',
      desc: 'Fast charging USB-C adapter for smartphones.',
      price: 15,
      img: 'https://via.placeholder.com/150?text=Charger',
    },
    {
      name: 'Sports Shoes',
      desc: 'Lightweight running shoes for men.',
      price: 59,
      img: 'https://via.placeholder.com/150?text=Shoes',
    },
    {
      name: 'Wireless Earbuds',
      desc: 'True wireless earbuds with charging case.',
      price: 79,
      img: 'https://via.placeholder.com/150?text=Earbuds',
    },
    {
      name: 'Digital Camera',
      desc: 'Compact digital camera for photography.',
      price: 120,
      img: 'https://via.placeholder.com/150?text=Camera',
    },
    {
      name: 'Tablet',
      desc: '10-inch tablet with high-resolution display.',
      price: 199,
      img: 'https://via.placeholder.com/150?text=Tablet',
    },
    {
      name: 'External Hard Drive',
      desc: 'Portable 1TB external hard drive.',
      price: 69,
      img: 'https://via.placeholder.com/150?text=Hard+Drive',
    },
    {
      name: 'Fitness Band',
      desc: 'Waterproof fitness band with step tracking.',
      price: 40,
      img: 'https://via.placeholder.com/150?text=Fitness+Band',
    },
    {
      name: 'Power Bank',
      desc: 'Multi-device power bank with fast charging.',
      price: 32,
      img: 'https://via.placeholder.com/150?text=Power+Bank',
    },
    {
      name: 'Electric Kettle',
      desc: 'Stainless steel electric kettle, 1.7 liters.',
      price: 24,
      img: 'https://via.placeholder.com/150?text=Kettle',
    },
    {
      name: 'Hand Blender',
      desc: 'Compact hand blender for kitchen.',
      price: 22,
      img: 'https://via.placeholder.com/150?text=Blender',
    },
    {
      name: 'Office Chair',
      desc: 'Comfortable ergonomic office chair.',
      price: 110,
      img: 'https://via.placeholder.com/150?text=Chair',
    },
    {
      name: 'Desk Lamp',
      desc: 'LED desk lamp with adjustable brightness.',
      price: 18,
      img: 'https://via.placeholder.com/150?text=Lamp',
    },
    {
      name: 'Water Bottle',
      desc: 'Insulated stainless steel water bottle.',
      price: 15,
      img: 'https://via.placeholder.com/150?text=Bottle',
    },
    {
      name: 'T-shirt',
      desc: 'Cotton T-shirt with stylish print.',
      price: 14,
      img: 'https://via.placeholder.com/150?text=T-shirt',
    },
    {
      name: 'Backpack',
      desc: 'Multi-compartment travel backpack.',
      price: 40,
      img: 'https://via.placeholder.com/150?text=Backpack',
    },
    {
      name: 'Bluetooth Keyboard',
      desc: 'Slim Bluetooth keyboard for tablets.',
      price: 30,
      img: 'https://via.placeholder.com/150?text=Keyboard',
    },
    {
      name: 'Smartphone',
      desc: 'Latest model Android smartphone.',
      price: 350,
      img: 'https://via.placeholder.com/150?text=Smartphone',
    },
    {
      name: 'Portable Fan',
      desc: 'Rechargeable mini fan for desktop.',
      price: 13,
      img: 'https://via.placeholder.com/150?text=Fan',
    },
    {
      name: 'LED Monitor',
      desc: '24-inch Full HD LED monitor.',
      price: 159,
      img: 'https://via.placeholder.com/150?text=Monitor',
    },
    {
      name: 'Wireless Router',
      desc: 'High-speed wireless router for home.',
      price: 46,
      img: 'https://via.placeholder.com/150?text=Router',
    },
  ];
  

  cartitems: any[] = [
    // name , desc , price , img
    {
      name: 'CART ITEMS ',
      desc: ' WELCOME TO SHOPEASY Special 50 % discount on shopping of ',
      price: 19999,
      img: 'https://via.placeholder.com/150?text=Headphones',
    },
  ]
  addtocart(item :any){
    this.cartitemcount = this.cartitems.length;
    this.cartitems.push(item);
  }
}
