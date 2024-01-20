import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AgentService {

  base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json=this.base_api;
  constructor(private http:HttpClient) { }


  get_agents():Observable<any>
  {

    return this.http.get(this.base_api+"/agents/",{ withCredentials: true })
  }


  add_agent(data:any):Observable<any>
  {
    return this.http.post(this.base_api+"/agents/",data,{ withCredentials: true });
  }

  update_agent(id:number,data:any):Observable<any>
  {
    return this.http.put(this.base_api+"/agents/"+id,data,{ withCredentials: true });
  }

  delete_agent(id:Number):Observable<any>
  {
    return this.http.delete(this.base_api+"/agents/"+id,{ withCredentials: true });
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_api+"/agents/"+id,{ withCredentials: true });
  }


  get_agent_number():number
  {
    
    var i=0;
   
     return i;
  }
  
}
