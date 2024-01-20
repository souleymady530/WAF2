import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
//notifications
  //base_api=environment.baseUrl;
 // base_json="http://localhost:3000";
  base_json=environment.baseUrl;

  constructor(private http:HttpClient) { }


  get_notifications():Observable<any>
  {

    return this.http.get(this.base_json+"/notifications/",{ withCredentials: true })
  }


  add_notifications(data:any):Observable<any>
  {
    return this.http.post(this.base_json+"/notifications/",data,{ withCredentials: true });
  }

  update_notifications(id:Number,data:any):Observable<any>
  {
    return this.http.put(this.base_json+"/notifications/"+id+"/",data,{ withCredentials: true });
  }

  delete_notifications(id:Number):Observable<any>
  {
    return this.http.delete(this.base_json+"/notifications/"+id+"/",{ withCredentials: true });
  }

  get_by_id(id:Number):Observable<any>
  {
    return this.http.get(this.base_json+"/notifications/"+id+"/",{ withCredentials: true });
  }

  get_agent_number():number
  {
    var i=0;
    this.get_notifications().forEach(element=>function(){
      i=i+1;
    })
     return i;
  }
}
