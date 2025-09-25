import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('location-agent-page');

  agent = {
    id: '412187',
    location: 'Pune, Maharashtra',
    lastSeen: '15 Days ago',
    views: 56,
    listings: 56,
    ratings: 56,
    joined: 56,
    contact: {
      address: 'Cresta Building, Plot No 90, Survey #129, 130/1+2, ITI Rd, Aundh, Pune, Maharashtra 411027, India',
      phone: '+91 9898909043',
      email: 'test@gmail.com',
      socials: ['facebook-f', 'twitter', 'instagram', 'pinterest'],
      chat: ['Skype', 'Whatsapp', 'On Site']
    }
  };

  reviews = [
    {
      name: 'Liza Rose',
      date: '12 February 2025',
      rating: 5,
      comment: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    },
    {
      name: 'Liza Rose',
      date: '12 February 2025',
      rating: 5,
      comment: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    },
    {
      name: 'Liza Rose',
      date: '12 February 2025',
      rating: 5,
      comment: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    }
  ];

    bg = 'banner-bg-location.jpg';
  avatar = 'hero-img-location.png';
  agentId = '412187';
  location = 'Pune, Maharashtra';
  lastSeen = 'Last active: 15 Days ago';
}
