import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { LoginDetails } from '../../models/login.modal';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false; // Add a loading flag
  hide = true;
  loginDetails: LoginDetails = { email: '', password: '' };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService

  ) {
    // Subscribe to router events

  }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  getControl(value: string) {
    return this.loginForm.get(value);
  }

  login() {
    this.loading = true; // Set loading to true when login is clicked
    this.loginDetails.email = this.loginForm.value.email!;
    this.loginDetails.password = this.loginForm.value.password!;
    this.loginService.login(this.loginDetails).subscribe(res => {
      this.loading = false; // Set loading to false when service is completed
      if (res.statusCode === 200) {
        console.log(res);
        localStorage.setItem('login_token', 'token');
        this.router.navigate(['/user']);
        this.toastr.success(res.message, res.statusCode);
      }
      else {
        this.toastr.error(res.message, res.statusCode);
      }
    });
  }
}