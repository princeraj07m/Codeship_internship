import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('xity-sidebar');
  sidebarOpen = true;
  sideIconopen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sideIconopen = !this.sideIconopen;
  }
  type = "user";
  changetype(str : string){
    this.type = str;
  }

}
