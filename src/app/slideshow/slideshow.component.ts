import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private _elementRef : ElementRef
  ) { }

  ngOnInit(): void {
    this.ModifyDOMElement();
  }

  ModifyDOMElement() : any{
    var counter = 1;
    setInterval( () => {
      let domElement = this._elementRef.nativeElement.querySelector(`#radio` + counter);
      domElement.checked = true;
      counter++;
      if (counter > 4) {
          counter = 1;
      }
  }, 3500);
  } 

}
