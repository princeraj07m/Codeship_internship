import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: './child.html',
  styleUrl: './child.scss'
})
export class Child {
  @Input() data!: string;
}