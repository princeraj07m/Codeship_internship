import { Component ,  Input } from '@angular/core';


@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.html',
  styleUrl: './parent.scss'
})
export class Parent {
  @Input() data!: string;
}
