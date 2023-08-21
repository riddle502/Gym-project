import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(localStorage.getItem('CurrentLoginUser')!=null)
      {
       // console.log("local storage-->",localStorage.getItem('CurrentLoginUser'))  
        const cloneReq=req.clone({
              headers:req.headers.set('Authorization','Bearer '+localStorage.getItem('CurrentLoginUser'))
          });

          //console.log("clone request-->",cloneReq)
          return next.handle(cloneReq).pipe(
              tap(
                  succ=>{},
                  err=>{
                      if(err.status==401)
                      {
                          localStorage.removeItem('CurrentLoginUser');
                          this.router.navigateByUrl('/')
                      }
                  }
              )
          )
      }
      else
      return next.handle(req.clone());
  }
}
