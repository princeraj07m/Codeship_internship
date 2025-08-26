import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('location_xcross');

  headData : any = [{
    name: 'Company Name',
    img: '/location/comp_head_img.jpg',
    phone: ['Location', 'XCross', 'Angular']
  },
  {
    name: 'Company Name 2',
    img: '/location/comp_head_img.jpg',
    phone: ['Location', 'XCross', 'Angular']
  },
  {
    name: 'Company Name 3',
    img: '/location/comp_head_img.jpg',
    phone: ['Location', 'XCross', 'Angular']
  }
  ];

}
