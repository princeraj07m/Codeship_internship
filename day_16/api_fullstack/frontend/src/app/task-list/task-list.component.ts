import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: { title: string; description: string; completed?: boolean; } = { title: "", description: "", completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  addTask() {
    if (this.newTask.title.trim() === "") return;
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { title: "", description: "", completed: false };
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  toggleTask(task: Task) {
    this.taskService.updateTask(task.id!, !task.completed).subscribe(() => this.loadTasks());
  }
}
