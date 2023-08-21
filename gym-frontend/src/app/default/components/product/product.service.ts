import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly BaseUrl=environment.apiurl

  constructor(private http:HttpClient) { }

  category(){
    return this.http.get<any>(this.BaseUrl+'Category');
  }
  subcategory(id:any){
    return this.http.get<any>(this.BaseUrl+'subCategory/'+id);
  }
  getBrand(value:any){
    return this.http.post<any>(this.BaseUrl+'Brand/getbrands',value );
  }
  getAddproduct(value:FormData){
    console.log("value--->",value)
    return this.http.post<any>(this.BaseUrl+'product',value);
  }
  getalldata(){
    return this.http.get<any>(this.BaseUrl+'product');
  }

  uploadBulkProducts(file: File){
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    return this.http.post<any>(this.BaseUrl+'product/bulk',formData)
  }


}
