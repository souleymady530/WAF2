import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
//P@ssw0rd75675420
//John
export class SessionLoginService {

  LOGIN_URL = '/auth/login/';
  LOGOUT_URL = '/auth/logout/';

  constructor(
    private httpClient: HttpClient
  ) { }

  login(pUsername,pPassword){
    const loginData = {
      username: pUsername,
      password: pPassword
    }
    return new Observable<boolean> ((observer)=>{
      this.httpClient.post(environment.baseUrl + this.LOGIN_URL, loginData,{ withCredentials: true }).subscribe(result =>{
        observer.next(true);
        observer.complete();
      },error => {
        observer.error(false);
        observer.complete();
      });
    });
  }

  logout(){
    return new Observable<boolean>((observer)=>{
      this.httpClient.get(environment.baseUrl + this.LOGOUT_URL,{ withCredentials: true }).subscribe(result =>{
        observer.next(true);
        observer.complete();
      },error => {
        observer.error(false);
        observer.complete();
      });
    });
  }


}
