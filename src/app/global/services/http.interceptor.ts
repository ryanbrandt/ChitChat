import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { UserService } from './user-service.service';

/* global HttpInterceptor, adds user token to header if user defined (e.g. if logged in), else, pass */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private userService: UserService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.userService.currentUser){ return next.handle(req); }
    req = req.clone({
      setHeaders: {
        authorization: `token ${ this.userService.currentUser.token }`
      }
    });
    return next.handle(req);
  }
}