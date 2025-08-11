import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule ],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.scss'
})
export class FormValidationComponent {
  data :any = {
    fname : "",
    lname : "",
    email : "",
    pass : "",
    cpass : ""
  }
  bg : string = "text-primary";

  formdata : any[] =[];
  register(){
    this.formdata.push({...this.data});
    this.bg = "text-success";
    alert("Registered Successfully");
  }



}
