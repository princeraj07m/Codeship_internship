import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Forms_in_Angular');

  idfor : string="";
  gender :string = "";
  setidfor(s : string){
    this.idfor=s;
  }
}
