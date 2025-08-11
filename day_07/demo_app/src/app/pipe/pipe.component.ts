import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { NaPipe } from '../custompipe/na.pipe';

@Component({
  selector: 'app-pipe',
  standalone: true,
  imports: [NaPipe,UpperCasePipe,LowerCasePipe,AsyncPipe,DatePipe,JsonPipe,TitleCasePipe,SlicePipe,CurrencyPipe,PercentPipe],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss'
})
export class PipeComponent {
  text:string = "Angular 18";
  date = new Date();
  number : number = 78;
  object :any = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};  //json pipe
  
  currtime: Observable<Date> = interval(1000).pipe(map((val) => new Date()));  //async pipe

  name :string = "Prince";
  emptyname :string = "";

}
