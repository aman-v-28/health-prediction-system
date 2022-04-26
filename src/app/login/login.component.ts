import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  result: any;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLogin() {
    if (this.loginFormGroup.valid) {
      this.authService.authenticateUser(this.loginFormGroup.value).subscribe((result: any) => {
        if (result.success) {
          this.authService.storeUserData(result.token, result.user);
          this.router.navigate(['/profile']);
        }
        else {
          this.result = result;
        }
      })
    }
  }

}
