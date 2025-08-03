import { Component } from '@angular/core';

@Component({
  selector: 'list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
    tasks =[{task : 1, done : false}];
    addtask(){
      this.tasks.push({task : 2 , done : false})
    }
}
