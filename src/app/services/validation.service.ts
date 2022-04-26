import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of, of as observableOf, async } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  result!: boolean
  answer!: boolean

  constructor(
    private authService: AuthService
  ) { }
  
  //password matching
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return;
    }
  }

  //email checking exits or not
  // uniqueEmailValidator(email: string) {
  //   return (formGroup: FormGroup) => {
  //     const emailControl = formGroup.controls[email];

  //     if (!emailControl) {
  //       return null;
  //     }

  //     if (emailControl.errors && !emailControl.errors.emailExist) {
  //       return null;
  //     }

  //     var user = {
  //       email: email
  //     }
  //     this.authService.emailExist(user).subscribe((result: any) => {
  //       this.result = result.success
  //       console.log(result.success)
  //       if(result.success){
  //         emailControl.setErrors(null);
  //       } else {
  //         emailControl.setErrors({ emailExist: true });
  //       }
  //     })
  //     return;
  //   }
  // }

  emailExists(email: string): Observable<any> { 
    var user = {
      email: email
    }
    // return this.authService.emailExist(user).subscribe((result: any) => {
    //   return of(email).pipe(
    //       map((email) => {
    //           return result.success;
    //         })
    //     );
    // })
    return of(email).pipe(
      map((email) => {
        //we use async await to use the result from subscribe outside this subcription
          // return this.mail(user); 
          let promise = new Promise((resolve, reject) => {
            this.authService.emailExist(user).subscribe((result: any) => {
              resolve(result.success);
            })
          })
          async function getData(){
            let response = await promise;
            console.log(response)
            return response;
          }
          // console.log(getData().__zone_symbol__value)
          getData().then((data: any)=> {return this.result = data});
          console.log(this.result);
          return this.result;
        })
    );
  }

  async mail(user: any){
    const res = await this.authService.emailExist(user).toPromise();
    console.log(res.success)
    return observableOf(res.success);
    // this.answer = this.result;
    // console.log(this.result);
    // return this.result;
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists(control.value).pipe(
        map((exists) => (exists ? { emailExists: true } : null)),
        catchError(async (err) => null)
        );
    };
  }

  //username checking taken or not
}
