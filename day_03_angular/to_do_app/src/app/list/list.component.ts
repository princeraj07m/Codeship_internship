import { Component } from '@angular/core';

@Component({
  selector: 'list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
    tasks =[{taskh: "task1",content : "task one"}];
    addtask(s1 : string, s2:string){
      this.tasks.push({taskh : s1 , content : s2})
    }
    addnote(){
      this.addtask(this.taskName,this.taskContent);
    }
    input:boolean = false;
    color:string = "red";
    done(){
      this.color = "green";
    }

    taskName = '';
    taskContent = '';
  updateName(event: Event) {
    this.taskName = (event.target as HTMLInputElement).value;
  }
  updateContent(event: Event) {
    this.taskContent = (event.target as HTMLInputElement).value;
  }

}
