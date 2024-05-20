import { Injectable } from '@angular/core';
import {Kwmlist} from "./kwmlist";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KwmListService {
  // Base URL for the API. All HTTP requests will use this URL as the base.
  private api = 'http://evernote.s2110456001.student.kwmhgb.at/api';

  // Injects HttpClient into your service, enabling HTTP requests to be made.
  constructor(private http:HttpClient) {
  }

  // Fetches all Kwmlist objects from the server. Uses HTTP GET request.
  // retry(3) retries the request up to three times in case of failure.
  // catchError intercepts any error during the HTTP request and passes it to errorHandler.
  getAll(): Observable<Array<Kwmlist>> {
    return this.http.get<Array<Kwmlist>>(`${this.api}/kwmlists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Fetches a specific Kwmlist object by its ID. Utilizes HTTP GET.
  // Similar error handling as the getAll method.
  getKwmlist(id: number): Observable<Kwmlist> {
    return this.http.get<Kwmlist>(`${this.api}/kwmlists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Deletes a specific Kwmlist object by its ID. Utilizes HTTP DELETE.
  // Retries and error handling are similar to the other methods.
  remove(id: number): Observable<any> {
    return this.http.delete<Kwmlist>(`${this.api}/kwmlists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Fetches Kwmlist objects that match a given search term. Uses HTTP GET.
  // Error handling is implemented similarly to other methods.
  getAllSearch(searchTerm: string): Observable<Array<Kwmlist>> {
    return this.http.get<Kwmlist>(`${this.api}/kwmlists/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Creates a new Kwmlist object. Utilizes HTTP POST.
  // Data for the new Kwmlist is passed in the body of the request.
  create(kwmlist: Kwmlist): Observable<any> {
    return this.http.post(`${this.api}/kwmlists`, kwmlist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Updates an existing Kwmlist object. Utilizes HTTP PUT.
  // The ID of the Kwmlist is included in the URL, and the updated data is passed in the request body.
  update(kwmlist: Kwmlist): Observable<any> {
    return this.http.put(`${this.api}/kwmlists/${kwmlist.id}`, kwmlist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Generic error handler for HTTP requests. It simply rethrows the error to be caught by subscribing functions.
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
    }
}
