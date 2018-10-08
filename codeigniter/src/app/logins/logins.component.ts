import { Component } from '@angular/core';
import {FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent {
public title="Login In";
user = new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]*")]);
passwd= new FormControl('',[Validators.required]);
model : any = {};// fetching the value from form

  constructor(private service:DatabaseService,private routes:Router) { }
  getNameErrorMessage(){
  
    return this.user.hasError('required') ? 'Name is required':
    this.user.hasError('pattern') ? 'Name Must Be Characters ':
    '';
  }
  getPasswordErrorMessage(){
    return this.passwd.hasError('required') ? 'password is required':
    '';
  }
  save(){
    debugger;
    debugger;
    var fetch=this.model;
    this.service.Register(fetch).subscribe((status:any)=>{
      console.log("got respo",status);
      // this.responseMessage="Successfully Saved";
      alert("SuccessFully Saved")
      // move to the other page after success
      this.routes.navigate(['/logins'])
    },(error)=>{
      console.log(error)
      // this.responseMessage="Error MailId/Mobile Is Already Present";
      alert("Error MailId/Mobile Is Already Present")
    })
  }
}
