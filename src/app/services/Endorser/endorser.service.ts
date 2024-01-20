import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EndorserService 
{base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json=this.base_api;
  constructor(private http:HttpClient) { }


  get_endorsers():Observable<any>
  {

    return this.http.get(this.base_json+"/endorsers")
  }


  add_endorser(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/endorsers",data);
  }

  update_endorser(id:number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/endorsers/"+id,data);
  }

  delete_endorser(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/endorsers/"+id);
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/endorsers/"+id);
  }


  get_endorser_number():number
  {
    
    var i=0;
   
     return i;
  }
  
}

//