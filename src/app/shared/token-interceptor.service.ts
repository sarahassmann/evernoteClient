import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  // Method that Angular calls for each HTTP request made by the application.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the original request and add an 'Authorization' header with a 'Bearer' token.
    req = req.clone({
      setHeaders: {
        // Retrieves the token from the session storage.
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    // Pass the modified request on to the next handler, which is the default Angular HTTP processing.
    return next.handle(req);
    }
  }
