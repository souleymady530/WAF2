import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private app=null
  base_api=environment.baseUrl;
 //base_json="http://localhost:3000";
  base_json=this.base_api;
  ressource="loans"
  constructor(private http:HttpClient) {this.app=null }

  
  get_credits():Observable<any>
  {

    return this.http.get(this.base_json+"/"+this.ressource,{ withCredentials: true })
  }


  add_credits(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/"+this.ressource+"/",data,{ withCredentials: true });
  }

  update_credits(id:number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/"+this.ressource+"/"+id,data,{ withCredentials: true });
  }

  delete_credits(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/"+this.ressource+"/"+id,{ withCredentials: true });
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/"+this.ressource+"/"+id,{ withCredentials: true });
  }

   

}
