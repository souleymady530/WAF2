import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json= this.base_api;
  constructor(private http:HttpClient) { }

  get_applicants():Observable<any>
  {

    return this.http.get(this.base_json+"/applicants")
  }


  add_applicants(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/applicants",data);
  }

  update_applicants(id:number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/applicants/"+id,data);
  }

  delete_applicants(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/applicants/"+id);
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/applicants/"+id);
  }


   
}
