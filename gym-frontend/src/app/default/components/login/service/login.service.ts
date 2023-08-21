import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly BaseUrl=environment.apiurl
  

  constructor(private http:HttpClient) { }
 
  userLogin(val:any){
    console.log("baseurl---->",this.BaseUrl)
    console.log("val-->",val)
    return this.http.post<any>(this.BaseUrl+'login',val);
  }
}
