import { Component, OnInit, Input,  } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/model/course';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User = new User(0, "", "", "", "", "", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png");

  constructor(private storageService: StorageService,
        private apiService: ApiService, private router: Router
    ) { }
  // token: string=null;
  // token2 ="Token 67883e6d-4d51-4608-82c4-c791eca2e638";
  loggedin=false;
  quantitycart:number;
  messageCart: string;
  userNameInfor: string;
  arrCart: Course[] = [];
  active:string = "active";
  searchQuery: string = "";
  ngOnInit() {
    this.loadUser();
    this.loadCart();
  }

  // phan load cart
  loadCart(){
    this.storageService.localStorage.getItem("cart").subscribe((data: Course[])=>{
      if(data == null || data.length == 0)
      {
        this.messageCart = "Your cart is empty";
      }
      else
      {
        this.arrCart= data;
        this.quantitycart = data.length;
        //do du lieu
      }
    });
  }
  loadUser()
  {
    //loading user
    this.storageService.localStorage.getItem("user").subscribe((data: User) => {
      if(data == null)  //user havent logged in
      {
        console.log("User haven't logged in");
        this.loggedin = false;
      }
      else{
        console.log("User logged in");
        this.userNameInfor = data.username;
        this.currentUser = data;
        this.loggedin = true;
        console.log(this.currentUser.avatar_Url)
      }
    });
  }

  onLogoutClick()
  {
    this.storageService.localStorage.removeItem("user").subscribe(()=>{});
    this.storageService.localStorage.removeItem("token").subscribe(()=>{});
    this.storageService.localStorage.removeItem("cart").subscribe(()=>{});
    this.loggedin = false;
    this.router.navigate(["/index"]);
    // document.location.reload();
  }
  onSearch()
  {
    if(this.searchQuery.length > 0)
      //this.router.navigate(['/searchresult', this.searchQuery]);
      window.location.replace('/searchresult/'+ this.searchQuery);
  }
}
