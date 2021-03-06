import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[DatabaseService]
})
export class RegisterComponent{
  // public greeting="";
  constructor(private service:DatabaseService,private routes:Router){

  }
public title="Welcome";
/**
 * @var email holds the email present in form data 
 * @var user holds the name present in form data 
 * @var mobile holds the mobile present in form data 
 * @var passwd holds the password present in form data 
 */
email = new FormControl('', [Validators.required,Validators.email]);
user = new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]*")]);
user1 = this.user.value;
mobile = new FormControl('',[Validators.required,Validators.pattern("[0-9]{10}")]);
passwd= new FormControl('',[Validators.required]);

model : any = {};// fetching the value from form
responseMessage="";
getErrorMessage() {
  return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Not a valid email' :
          '';
}
getNameErrorMessage(){
  
  return this.user.hasError('required') ? 'Name is required':
  this.user.hasError('pattern') ? 'Name Must Be Characters ':
  '';
}
getMobileErrorMessage(){
  return this.mobile.hasError('required') ? 'Mobile number is required':
  this.mobile.hasError('pattern') ? 'Must be number and 10 digit':
  '';
}
getPasswordErrorMessage(){
  return this.passwd.hasError('required') ? 'Password is required':
  '';
}

save()
{
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
