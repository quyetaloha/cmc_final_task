import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ApiService} from '../services/api.service';
@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
	param1: string;
	url;
	 user = new User(1,""," "," "," "," "," ");
	 dataArray : any;
	 id: number;
     fullname: string;
     username: string;
     email :string;
   password : string;
		 avatar_Url :string;
	 phone:string;
	constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute
		,private apiService: ApiService)
 {
 	this.route.queryParams.subscribe(params => {
        this.param1 = params['token'];
        // this.param2 = params['param2'];
        console.log(this.param1);
    });
 	 this.url =this.apiService.domain+`confirmUserRegistration?token=`+this.param1;
 	 this.http.post(this.url,"").toPromise().then(
    	data=> {
    		console.log(data);
    		var d : any = data;
    		// this.id= d.data.id;
    		this.fullname=d.data.fullname;
    		this.username=d.data.username;
    		this.email=d.data.email;
    		this.password=d.data.password;
    		this.avatar_Url=d.data.avatar_Url;
    		this.phone=d.data.phone;
    		//console.log(this.dataArray);
    		this.user = new User(this.id,this.fullname,this.username,this.email,this.password,this.avatar_Url,this.phone);
    		//console.log(this.user);

    	}); 
 }

  ngOnInit() {
  }

}
