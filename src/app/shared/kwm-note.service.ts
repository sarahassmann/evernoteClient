import { Injectable } from '@angular/core';
import {Kwmnote} from "./kwmnote";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Kwmlist} from "./kwmlist";
import {Kwmtag} from "./kwmtag";

@Injectable({
  providedIn: 'root'
})
export class KwmNoteService {
  private api = 'http://evernote.s2110456001.student.kwmhgb.at/api'

  // HttpClient injected through the constructor, enabling HTTP requests
  constructor(private http:HttpClient) { }

  // Retrieves all notes. HTTP GET request is made to the specified API endpoint.
  // catchError is used to handle any errors that occur during the request.
  getAll(): Observable<Array<Kwmnote>> {
    return this.http.get<Array<Kwmnote>>(`${this.api}/kwmnotes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Retrieves all tags. Similar structure to getAll() for consistency.
  getTags():Observable<Array<Kwmtag>>{
    return  this.http.get<Array<Kwmtag>>(`${this.api}/kwmtags`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Retrieves a single note by its ID. Follows the same pattern as getAll().
  getKwmnote(id: number): Observable<Kwmnote> {
    return this.http.get<Kwmnote>(`${this.api}/kwmnotes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Deletes a note by ID. Uses HTTP DELETE. Retries and error handling similar to other methods.
  remove(id: number): Observable<any> {
    return this.http.delete<Kwmnote>(`${this.api}/kwmnotes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Updates a specific note. HTTP PUT request includes the note object in the request body.
  update(kwmnote: Kwmnote): Observable<any> {
    return this.http.put(`${this.api}/kwmnotes/${kwmnote.id}`, kwmnote)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Creates a new note. HTTP POST request with the note object.
  create(kwmnote: Kwmnote): Observable<any> {
    return this.http.post(`${this.api}/kwmnotes`, kwmnote)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Assigns a tag to a note. The tag ID is passed in the request body.
  // This method allows adding a tag to a specific note by making a POST request.
  assignKwmTagToNote(kwmnote: Kwmnote, tag_id: number): Observable<any>{
    return this.http.post(`${this.api}/kwmnotes/${(kwmnote.id)}`, {tag_id:[tag_id]})
      .pipe(retry(3), catchError(this.errorHandler));
  }

  // Generic error handler that simply rethrows the error. Used in all API calls to handle exceptions.
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
