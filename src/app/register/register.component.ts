import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  result: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      // date: new FormControl('',[Validators.required]),
      number: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  
  onRegister(){
    console.log(this.formGroup.value.name);
    this.authService.registerUser(this.formGroup.value)
    .subscribe(async (result:any) => {
      // console.log(result)
      this.result = result;

      function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }
      await delay(3000);
      
      if(result.success) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']);
      }
    })
  }
}
