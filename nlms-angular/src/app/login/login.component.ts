import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { LocalStorage } from '@ngx-pwa/local-storage';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StorageService } from '../services/storage.service';
import { ApiService} from '../services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private http: HttpClient, private router: Router,
		private storageService: StorageService, private dialog: MatDialog,
		private apiService: ApiService,
		) {
		// localStorage.clear();
	}
	ngOnInit() {
	}
	submitted = false;
	onSubmit() { this.submitted = true; }
	onBack() { this.submitted = false; }
	user = new User(1, "", "", "", "", "", "");
	postData;
	dataArray: any;

	url1;
	key = 'value';
	value: any = null;
	url = this.apiService.domain+`authenticate`;
	onClick(user: User) {
		this.postData =
			{
				username: user.username,
				password: user.password,

			}
		this.http.post(this.url, this.postData).subscribe(
			response => {
				var d: any = response;
				d = d.data;
				// localStorage.setItem(this.key, JSON.stringify(user));

				this.storageService.localStorage.setItem("user", d[0]).subscribe(() => { });
				this.storageService.localStorage.setItem("token", d[1]).subscribe(() => { });

				this.router.navigate(['/index']);
				//console.log(localStorage.setItem(this.key, JSON.stringify(myObj)));
			},
			err => {
				console.log(err);
				//error
				const dialogRef = this.dialog.open(LoginFailedDialog, {
					width: '500px',
				});
				dialogRef.afterClosed().subscribe(() => {
					//after dialog close
				});
			}

		);

	}

	onRest(email: string) {

		this.url1 = this.apiService.domain+`forgotPassword?email=` + email;
		this.http.post(this.url1, "").subscribe(
			data => {
				console.log(data);
				var d: any = data;
				if (d.data == false) {
					const dialogRef = this.dialog.open(EmailFailedDialog, {
						width: '500px',
					});
					dialogRef.afterClosed().subscribe(() => {
						//after dialog close
					});
				}
				else
				{
					const dialogRef = this.dialog.open(EmailSucssessDialog, {
						width: '500px',
					});
					dialogRef.afterClosed().subscribe(() => {
						//after dialog close
					});
				}
				//
				//this.dataArray= d.token;
				//var d : any = data;
				//this.loginService.info.email = d.data.email;
				//console.log(d.data.email);
				// let myObj= {token : d};
				// localStorage.setItem(this.key, JSON.stringify(myObj));
				//console.log(localStorage.setItem(this.key, JSON.stringify(myObj)));
			},
			err => {
				console.log(err);
				//error

			}

		);

	}

}

@Component({
	selector: 'loginfailed',
	templateUrl: 'loginfailed.html'
})
export class LoginFailedDialog {

	constructor(public dialogRef: MatDialogRef<LoginFailedDialog>
		, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
@Component({
	selector: 'emailfailed',
	templateUrl: 'emailfailed.html'
})
export class EmailFailedDialog {

	constructor(public dialogRef: MatDialogRef<EmailFailedDialog>
		, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
@Component({
	selector: 'emailsucssess',
	templateUrl: 'emailsucssess.html'
})
export class EmailSucssessDialog {

	constructor(public dialogRef: MatDialogRef<EmailSucssessDialog>
		, @Inject(MAT_DIALOG_DATA) public data: any) { }
}      