import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot} from "@angular/router";
import {from,Observable,of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements CanActivate{

  profile:any = null;
  endpointURL = environment.baseUrl + '/users/'

  constructor(
    private httpClient: HttpClient,
    private router : Router
  ) { }

  getProfile(): Observable<any> {
    if (this.profile) {
      return from(Promise.resolve(this.profile));
    } else {
      return this.httpClient.get(this.endpointURL, { withCredentials: true }).pipe(
        map(profile => {
          this.profile = profile;
          return profile;
        }),
        catchError(error => {
          return from(Promise.reject(error));
        })
      );
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if(localStorage.getItem("currentUser"))
      return true;
    else  this.router.navigate(["/login"])
    
  }


}
/*
return this.getProfile().pipe(
      map(profile => {
        return true;
      }),
      catchError(error => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );*/