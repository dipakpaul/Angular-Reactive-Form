import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  constructor(private fb: FormBuilder){}
  registrationForm = this.fb.group({
    userName: ['Dipak'],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      street: ['Hosa Road'],
      city: ['Bangalore'],
      state: ['Karnataka'],
      postalCode: ['560100']
    })
  })

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
