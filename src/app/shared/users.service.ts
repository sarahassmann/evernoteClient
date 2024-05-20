import { Injectable } from '@angular/core';
import {Kwmnote} from "./kwmnote";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./user";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Define the base URL for API requests.
  private api = 'http://evernote.s2110456001.student.kwmhgb.at/api'

  // The constructor method injects the HttpClient service for making HTTP requests.
  constructor(private http:HttpClient) { }

  // Define a method to retrieve all users from the backend.
  getAll(): Observable<Array<User>> {
    // Makes an HTTP GET request to fetch all users from the specified endpoint.
      return this.http.get<Array<User>>(`${this.api}/users`)
        .pipe(retry(3)).pipe(catchError(this.errorHandler))
    }

  // Define a private method for handling errors encountered during HTTP requests.
    private errorHandler(error: Error | any): Observable<any> {
      return throwError(error);
    }
}
