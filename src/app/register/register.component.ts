import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  result!: any;
  formGroup : FormGroup = new FormGroup({});
  loading$ = this.loader.loading$

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService,
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      // date: new FormControl('',[Validators.required]),
      number: new FormControl('', [Validators.required]),
      email: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.validationService.uniqueEmailValidator()]
      }),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.validationService.MatchPassword('password', 'confirmPassword'),
      // validator: this.validationService.uniqueEmailValidator('email')
    })
  }

  get formgroup() {
    return this.formGroup.controls;
  }

  numericOnly(event: any) {
    const input = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(input)) {
      event.preventDefault();
    }
  }

  onRegister() {
    if (this.formGroup.valid) {
      this.authService.registerUser(this.formGroup.value)
        .subscribe(async (result: any) => {
          // console.log(result)
          this.result = result;

          function delay(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          await delay(2000);

          if (result.success) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/register']);
          }
        })
    }
  }
}
