import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecteurServicesService {
  base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json=environment.baseUrl;
  constructor(private http:HttpClient) { }

  
  get_secteurs():Observable<any>
  {

    return this.http.get(this.base_json+"/secteurs/",{ withCredentials: true })
  }


  add_secteur(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/secteurs/",data,{ withCredentials: true });
  }

  update_secteur(id:number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/secteurs/"+id,data,{ withCredentials: true });
  }

  delete_secteur(id:number):Observable<any>
  {
    return this.http.delete(this.base_json+"/secteurs/"+id,{ withCredentials: true });
  }

  get_by_id(id:number):Observable<any>
  {
    return this.http.get(this.base_json+"/secteurs/"+id,{ withCredentials: true });
  }

 
  get_secteur_number():number
  {
    
    var i=0;
   
     return i;
  }
}
