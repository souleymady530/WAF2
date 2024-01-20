import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json=environment.baseUrl;

  constructor(private http:HttpClient) { }


  get_man():Observable<any>
  {

    return this.http.get(this.base_json+"/managers/",{ withCredentials: true })
  }


  add_man(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/managers/",data,{ withCredentials: true });
  }

  update_man(id:Number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/managers/"+id+"/",data,{ withCredentials: true });
  }

  delete_man(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/managers/"+id+"/",{ withCredentials: true });
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/managers/"+id+"/",{ withCredentials: true });
  }

  get_agent_number():number
  {
    var i=0;
    this.get_man().forEach(element=>function(){
      i=i+1;
    })
     return i;
  }
  


}
