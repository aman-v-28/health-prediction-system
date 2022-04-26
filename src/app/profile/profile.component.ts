import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUpdateFormGroup!: FormGroup;
  user!: any;
  loading$ = this.loader.loading$

  constructor(
    private authService:AuthService,
    private router: Router,
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
    },
     err => {
       console.log(err);
       return false;
     });

     this.initForm();
  }

  initForm() {
    this.profileUpdateFormGroup = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      name: new FormControl(),
      number: new FormControl(),
      id: new FormControl()
    })
  }

  onProfileUpdate(){
    if(this.profileUpdateFormGroup.value.username === null){
      this.profileUpdateFormGroup.value.username = this.user.username
    }
    if(this.profileUpdateFormGroup.value.email === null){
      this.profileUpdateFormGroup.value.email = this.user.email
    }
    if(this.profileUpdateFormGroup.value.name === null){
      this.profileUpdateFormGroup.value.name = this.user.name
    }
    if(this.profileUpdateFormGroup.value.number === null){
      this.profileUpdateFormGroup.value.number = this.user.number
    }
    this.profileUpdateFormGroup.value.id = this.user._id

    this.authService.updateProfile(this.profileUpdateFormGroup.value).subscribe((result: any) => {});
  }

  onProfileDelete(){
    this.authService.deleteProfile(this.user).subscribe((result: any) => {
      this.router.navigate(['/']);
      this.authService.logout();
    });
  }
}
