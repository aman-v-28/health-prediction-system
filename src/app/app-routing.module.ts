import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';

const routes: Routes = [
  {path:'', component: SlideshowComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: SidebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
