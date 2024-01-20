import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoussecteurServices {

  base_api=environment.baseUrl;
 // base_json="http://localhost:3000";
  base_json=environment.baseUrl;
  constructor(private http:HttpClient) { }

  
  get_soussecteurs():Observable<any>
  {

    return this.http.get(this.base_json+"/soussecteur/",{ withCredentials: true })
  }


  add_soussecteur(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/soussecteur/",data,{ withCredentials: true });
  }

  update_soussecteur(id:number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/soussecteur/"+id,data,{ withCredentials: true });
  }

  delete_soussecteur(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/soussecteur/"+id,{ withCredentials: true });
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/soussecteur/"+id,{ withCredentials: true });
  }


  get_soussecteur_number():number
  {
    
    var i=0;
   
     return i;
  }
}
