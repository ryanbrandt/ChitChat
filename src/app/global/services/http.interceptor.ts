import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user-service.service';
import { AlertService } from './alert-service.service';
import { DataService } from './data-service.service';

/* global HttpInterceptor, adds user token to header if user defined (e.g. if logged in), else, pass */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private userService: UserService, private router: Router, private alertService: AlertService, private dataService: DataService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.userService.getUserId()){
      req = req.clone({
        setHeaders: {
          authorization: `token ${ this.userService.getToken() }`
        }
      });
    }
    /* error interceptor, sets alerts/redirects based on error status code */
    return next.handle(req).pipe(catchError((error, caught) => {
        this.dataService.responseStatus = error.status;
        if(error.status == 0 || error.status == 500){
          this.router.navigate(['err']);
        } else if(error.status == 403){
          this.alertService.unauthorized('You do not have permission to perform this action');
        } else if(error.status == 400) {
          var msg = error['error'];
          for(let [key, value] of Object.entries(msg)){
            this.alertService.error(value[0]);
          }
        }
        return of(error);
      }) as any);
  }
}