import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  predictFormGroup!: FormGroup
  predictedDisease: any

  loading$ = this.loader.loading$
  
  constructor(
    private authService: AuthService,
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.predictFormGroup = new FormGroup({
      symptom1: new FormControl('',[Validators.required]),
      symptom2: new FormControl('',[Validators.required]),
      symptom3: new FormControl('',[Validators.required]),
      symptom4: new FormControl('',[Validators.required]),
      symptom5: new FormControl('',[Validators.required])
    })
  }

  onPredict(){
    this.authService.predict(this.predictFormGroup.value).subscribe((result: any) => {
      this.predictedDisease = result;
      // console.log(result.length)
    })
  }
}
