import { Injectable } from '@angular/core';
import { Kwmtodo } from "./kwmtodo";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KwmTodoService {
  private api = 'http://evernote.s2110456001.student.kwmhgb.at/api'

  // Constructor that injects HttpClient into the service for making HTTP requests.
  constructor(private http:HttpClient) { }

  // Fetches all todos from the backend. Automatically retries up to 3 times if the request fails.
  getAll(): Observable<Array<Kwmtodo>> {
    return this.http.get<Array<Kwmtodo>>(`${this.api}/kwmtodos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Fetches a specific to-do by its ID, with debugging to log the received data.
  getKwmtodo(id: number): Observable<Kwmtodo> {
    return this.http.get<Kwmtodo>(`${this.api}/kwmtodos/${id}`)
      .pipe(
        retry(3),
        tap(data => console.log('received data: ', data)), // Zum Debuggen
        catchError(this.errorHandler)
      );
  }

  // Removes a specific to-do by its ID. Retries up to 3 times on failure.
  remove(id: number): Observable<any> {
    return this.http.delete<Kwmtodo>(`${this.api}/kwmtodos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Updates a specific to-do with new data. Retries on failure and handles errors.
  update(kwmtodo: Kwmtodo): Observable<any> {
    return this.http.put(`${this.api}/kwmtodos/${kwmtodo.id}`, kwmtodo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Creates a new to-do item. Retries on failure and handles any errors that occur.
  create(kwmtodo: Kwmtodo): Observable<any> {
    return this.http.post(`${this.api}/kwmtodos`, kwmtodo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Private method to handle errors from HTTP requests. Throws the received error as an observable error.
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
