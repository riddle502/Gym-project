import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalelistService {
  private readonly BaseUrl=environment.apiurl

  constructor(private http:HttpClient) { }

  product(){
    return this.http.get<any>(this.BaseUrl+'product');
  }
  getstores(){
    return this.http.get<any>(this.BaseUrl+'user/getStore')
  }

  AssignProduct(obj:any){
    console.warn("obj-->",obj)
    return this.http.post<any>(this.BaseUrl+'product/assign-products',obj)
  }

}
