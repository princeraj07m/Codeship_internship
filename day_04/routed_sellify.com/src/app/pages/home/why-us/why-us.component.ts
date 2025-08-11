import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  features1 =[
  {
    "img": "https://gaddzy.in/icon/best_price.svg",
    "p1": "Best Prices Guaranteed",
    "p2": "Get the best price for your old devices, ensuring maximum value for your trade-in, backed by fair and transparent evaluations."
  },
  {
    "img": "https://gaddzy.in/icon/payment.svg",
    "p1": "Instant Payment",
    "p2": "Receive instant payment in your preferred mode, whether at pickup or during a store drop-off, for a seamless selling experience."
  }
]

  features2 = [
  {
    "img": "https://gaddzy.in/icon/simple.svg",
    "p1": "Simple & Convenient",
    "p2": "Check your device's price, schedule a convenient pickup, and get paid instantly—it's that simple!"
  },
  {
    "img": "https://gaddzy.in/icon/pickup.svg",
    "p1": "Free Doorstep Pickup",
    "p2": "Enjoy free pickup services in over 1500 cities across India, making selling your device effortless and cost-free."
  },
  {
    "img": "https://gaddzy.in/icon/invoice.svg",
    "p1": "Valid Purchase Invoice",
    "p2": "Each transaction comes with a genuine bill of sale, providing proof of purchase and security for both parties involved."
  }
]
}
