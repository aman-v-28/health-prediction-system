import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent,
    PredictionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
