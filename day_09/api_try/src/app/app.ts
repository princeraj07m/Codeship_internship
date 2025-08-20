import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('api_try');

  ngOnInit(): void {
    this.getdata();
  }

  gotdata = signal<any[]>([]);
  deptObj : any[] = [{
    "departmentId": 0,
    "departmentName": "",
    "departmentLogo": ""
  }
]
  http = inject(HttpClient)
  getdata(){
    this.http.get("https://projectapi.gerasim.in/api/Complaint/GetParentDepartment").subscribe((res:any)=>{
      this.gotdata.set(res.data);
      console.log(this.gotdata);
    })
  }
  postdata(){
    this.http.post("https://projectapi.gerasim.in/api/Complaint/AddNewDepartment", this.deptObj).subscribe((res:any)=>{
      if(res.result){
        alert("Done");
      }else{
        alert(res.massage);
      }
    })
  }
}
