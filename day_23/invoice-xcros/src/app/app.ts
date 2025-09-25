import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  standalone:false,
  styleUrls: ['./app.scss']
})
export class AppComponent {
  mailUs = 'contact@gudvil.nexus';
  callUs = '+91 8899005643';
  visitUs = 'Chennai, Tamil Nadu, India';
  orderNumber = '12345';
  orderDate = '21 Sep 2021';

  billedTo = {
    name: 'Daniel Deve',
    addressLine1: '42304 Main',
    addressLine2: 'Apt. 6B',
    cityStateZip: 'Springfield, ST 35436'
  };

  shippedTo = {
    name: 'Daniel Deve',
    addressLine1: '42304 Main',
    addressLine2: 'Apt. 6B',
    cityStateZip: 'Springfield, ST 35436'
  };

  paymentMethod = {
    card: 'Visa Card',
    bank: 'BRAK Bank'
  };

  items = [
    { name: 'Website Design', description: 'Six web page designs and three times revision', price: 10.99, qty: 1 },
    { name: 'Web Development', description: 'Convert pixel-perfect frontend and make it dynamic', price: 20.00, qty: 3 },
    { name: 'App Development', description: 'Android & Ios Application Development', price: 640.00, qty: 1 }
  ];

  taxRate = 5;

  get subTotal() {
    return this.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }

  get tax() {
    return this.subTotal * (this.taxRate / 100);
  }

  get grandTotal() {
    return this.subTotal + this.tax;
  }
}