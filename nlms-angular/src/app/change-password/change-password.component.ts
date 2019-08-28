import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ApiService} from '../services/api.service';
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	url;
	url2;
	body;
	param1: string;
	user = new User(1, "", " ", " ", " ", " ", " ");
	dataArray: any;
	id: number;
	fullname: string;
	username: string;
	email: string;
	password: string;
	avatar_Url: string;
	phone: string;
	constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
		private apiService: ApiService) {
		this.route.queryParams.subscribe(params => {
			this.param1 = params['token'];
			// this.param2 = params['param2'];
			console.log(this.param1);
		});
		this.url =this.apiService.domain+`confirmResetToken?token=` + this.param1;
		this.http.post(this.url, "").toPromise().then(
			data => {
				console.log(data);
				var d: any = data;
				this.id = d.data.id;
				this.fullname = d.data.fullname;
				this.username = d.data.username;
				this.email = d.data.email;
				this.password = d.data.password;
				this.avatar_Url = d.data.avatar_Url;
				this.phone = d.data.phone;
				//console.log(this.dataArray);
				this.user = new User(this.id, this.fullname, this.username, this.email, this.password, this.avatar_Url, this.phone);
				//console.log(this.user);

			});
	}
	ngOnInit() {
	}

	onRest(user: User, confirm: string) {
		if (user.password == confirm) {
			this.body =
				{
					"id": user.id,
					"fullName": user.fullname,
					"email": user.email,
					"avatarUrl": user.avatar_Url,
					"phone": user.phone,
					"password": user.password,
					"username": user.username
				}
			console.log(user.password);
			this.url2 = this.apiService.domain+`updateUser`;
			this.http.put(this.url2, this.body).subscribe(
				res => {
					var d: any = res;
					alert("Đổi mật khẩu thành công");
					this.router.navigate(['']);
					console.log(res)
				},
				err => console.log(err)
			);

		}
		else {
			alert("Vui lòng xác nhận lại mật khẩu");
		}
	}

}
