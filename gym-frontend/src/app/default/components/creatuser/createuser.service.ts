import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  private readonly BaseUrl=environment.apiurl

  constructor(private http:HttpClient) { }

  getuserType(){
    return this.http.get<any>(this.BaseUrl + 'userType')
  }
  addUser(val:any){
    return this.http.post<any>(this.BaseUrl + 'user',val)
  }

  getUserUserType(val:any){
    console.log("val--->",val)
    return this.http.post<any>(this.BaseUrl +'user/seller',val)
  }

}
