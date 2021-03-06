import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators, FormGroupDirective , NgForm} from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-resets',
  templateUrl: './resets.component.html',
  styleUrls: ['./resets.component.css']
})
export class ResetsComponent implements OnInit {

  public title = "Reset Password";
  // is to track the value and vaidation state
  email = new FormControl('', [Validators.email]);
  pass = new FormControl('', [Validators.required]);
  pass1 = new FormControl('', [Validators.required]);

  // public childmsg="hello";
  public value = "Session Expired";

  model: any = {};// fetching the value from form
  responseMessage = "";

  constructor(private formBuilder: FormBuilder, private service: DatabaseService, private routes: Router) {
    // create the Instance of FormGroup instance 
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }
  /**
   * for the password validation
   */
  getPassErrorMessage() {
    return this.pass.hasError('required') ? 'Password is required' :
      '';
  }
  /**
   * for the confirm password validation
   */
  getConfErrorMessage() {
    return this.pass1.hasError('required') ? 'Confirm Password is required' :
      '';
  }
  /**
   * for the email validation
   */
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
      '';
  }
  /**
 * @method save()
 * when the close is clicked on the card for savinf to database
 */
  save() {
    var fetch = this.model;

    this.service.Reset(fetch).subscribe(
      // data returned will be stored in status variable
      (status: any) => {

        if (status.status == "200") {

          console.log("got respo", status);
          // this.responseMessage="Successfully Saved";
          alert("Password Reset Success")
          // move to the other page after success
          this.routes.navigate(['/logins'])
        }
        else if (status.status == "498") {
          alert("Token Is Invalid")
        }
        else if (status.status == "401") {
          alert("Linked EXpired/Email Is Invalid")
        }

      },

    );
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    let obs = this.service.getMail();
    obs.subscribe(
      (res: any) => {
        this.value = res.key;
        // this.value = "darshu";
      });
  }

  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  /**
   * @method checkPasswords()
   * to confirm password and password entred same or not
   */

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    //controls -> A collection of child controls. 
    //The key for each child is the name under which it is registered.
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
