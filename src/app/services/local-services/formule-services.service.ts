import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormuleServicesService {

  base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json=environment.baseUrl;

  constructor(private http:HttpClient) { }


  get_formule():Observable<any>
  {

    return this.http.get(this.base_json+"/formule1/",{ withCredentials: true })
  }


  add_formule(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/formule1/",data,{ withCredentials: true });
  }

  update_formule(id:Number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/formule1/"+id+"/",data,{ withCredentials: true });
  }

  delete_formule(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/formule1/"+id+"/",{ withCredentials: true });
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/formule1/"+id+"/",{ withCredentials: true });
  }

  
}
