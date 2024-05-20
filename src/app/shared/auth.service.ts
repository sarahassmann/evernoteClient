import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // get the api from the environment file
  private api = 'http://evernote.s2110456001.student.kwmhgb.at/api/auth';

  // define the http client and constructor for http client
  constructor(private http: HttpClient) {

  }

  // login function to send the email and password to the backend
  login(email: string, password: string) {
    // return the http post request to the backend with the email and password
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  // session storage function to set the token and user id in the session storage
  public setSessionStorage(token: string) {
    // decode the token and set the token and user id in the session storage
    const decodedToken = jwtDecode(token) as Token;
    console.log(decodedToken);
    // set the token and user id in the session storage
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', decodedToken.user.id);
  }

  public getCurrentUserId(): number {
    return Number.parseInt(<string>sessionStorage.getItem('userId'));
  }

  // logout function to send the post request to the backend to log out the user
  public logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }

  // check if the user is logged in or not by checking the token
  public isLoggedIn(): boolean {
    // check if the token is in the session storage or not
    if (sessionStorage.getItem('token')) {
      // get the token from the session storage and decode it
      let token = <string>sessionStorage.getItem('token');
      // decode the token
      const decodedToken = jwtDecode(token) as Token;
      // get the expiration date of the token and check if the token is expired or not
      let expirationDate = new Date(0);
      // set the expiration date of the token and check if the token is expired or not
      expirationDate.setUTCSeconds(decodedToken.exp);
      // check if the token is expired or not and return the result
      if (expirationDate < new Date()) {
        console.log('Token expired');
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}


