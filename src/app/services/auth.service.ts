import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  registerUser(user: any){
    var header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/register', user, {headers: header});    
  }

  authenticateUser(user: any){
    var header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/authenticate', user, {headers: header});    
  }

  getProfile() {
    this.loadToken();
    var header = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:3000/profile', {headers: header});
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    this.loadToken();
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
