import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]]
    });
   }

  ngOnInit(): void {
  }

  data:any
  token:any

  submit() {
    this.submitted = true;
    if(this.loginForm.valid) {
      var userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      console.log(userData);
      this.loginService.login(userData).subscribe((response: any) => {
        console.log(response);
        this.data = response
        this.token = this.data.token
        localStorage.setItem('token', this.token)
        localStorage.setItem('email', userData.email)
      }, (error: any) => {
        console.log(error);
      })
      this.router.navigate(['./ordersList']);
    }
  }

}
