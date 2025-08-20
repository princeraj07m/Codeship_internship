import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-api',
  standalone: false,
  templateUrl: './api.html',
  styleUrl: './api.scss'
})
export class Api {
  doglist : any [] = [];
  constructor(private http: HttpClient){
    
  }
  getallusers(){
    this.http.get("https://dogapi.dog/api/v2/breeds").subscribe((res:any)=>{
    this.doglist = res.data;
    })
  }
}
