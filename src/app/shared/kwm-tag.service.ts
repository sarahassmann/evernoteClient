import { Injectable } from '@angular/core';
import {Kwmnote, Kwmtag} from "./kwmtag";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KwmTagService {
  // Base URL for API requests, set to communicate with the backend server
  private api = 'http://evernote.s2110456001.student.kwmhgb.at/api'

  // Constructor injects the HttpClient service which allows for making HTTP requests
  constructor(private http:HttpClient) { }

  // Retrieves all tags from the server using a GET request, with retry logic in case of failures
  getAll(): Observable<Array<Kwmtag>> {
    return this.http.get<Array<Kwmtag>>(`${this.api}/kwmtags`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Fetches a single tag by its ID using a GET request
  getKwmtag(id: number): Observable<Kwmtag> {
    return this.http.get<Kwmtag>(`${this.api}/kwmtags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Removes a tag by ID using a DELETE request
  remove(id: number): Observable<any> {
    return this.http.delete<Kwmtag>(`${this.api}/kwmtags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Updates a tag's details using a PUT request
  update(kwmtag: Kwmtag): Observable<any> {
    return this.http.put(`${this.api}/kwmtags/${kwmtag.id}`, kwmtag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Creates a new tag using a POST request
  create(kwmtag: Kwmtag): Observable<any> {
    return this.http.post(`${this.api}/kwmtags`, kwmtag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Generic error handler for HTTP requests that simply rethrows the error to be handled by subscribing functions
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
