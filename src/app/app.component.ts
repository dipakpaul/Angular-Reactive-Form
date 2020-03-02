import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name-validator';
import { PasswordValidator } from './shared/password-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  registrationForm: FormGroup;
  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternameEmails() {
    return this.registrationForm.get('alternameEmails') as FormArray;
  }

  addAlernameEmail() {
    this.alternameEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        street: ['Hosa Road'],
        city: ['Bangalore'],
        state: ['Karnataka'],
        postalCode: ['560100']
      }),
      alternameEmails: this.fb.array([])
    }, {validator: PasswordValidator});

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if(checkedValue){
          email.setValidators(Validators.required);
        }else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      })
  }
  
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Dipak'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  loadApiData() {
    console.log("I am inside loadApiData()");
    this.registrationForm.setValue({
      userName: 'Dipak',
      password: 'test',
      confirmPassword: 'test',
      address: {
        street: 'hosa road',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560100'
      }
    });
  }
}
