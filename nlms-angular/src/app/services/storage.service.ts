import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../model/user';
import { ApiService } from './api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  currentUser: User;
  token: string = "";
  cart: any;

  constructor(public localStorage: LocalStorage, private apiService: ApiService) {
    // var obs = this.apiService.authenticate();
    // obs.subscribe((response: HttpResponse<any>) => {
    //   var r : any = response;
    //   this.currentUser = r.data[0];
    //   this.token = r.data[1];
    //   //push to local storage
    //   this.localStorage.setItem("token", this.token).subscribe(()=>{});
    //   this.localStorage.setItem("user", this.currentUser).subscribe(()=>{});
    //   console.log("Token: " + this.token);
    // }, (error: HttpErrorResponse) => {
    //   console.log("error while loading user:");
    //   console.log(error);
    //   alert("An error has occured while loading data, please try again later :(");
    // })
  }
}
