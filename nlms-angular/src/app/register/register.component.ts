import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private dialog : MatDialog)
 {
 	// localStorage.clear();
 }
 user = new User(1,"","","","","","");
 postData;

  ngOnInit() {
  }
    url =`http://localhost:8080/register`;   
  onClick(user: User)
  {
    this.postData =
    {
    	"fullName":user.fullname,
  		"email":user.email,
  		"avatarUrl":user.avatar_Url,
  		"phone":user.phone,
  		"password":user.password,
  		"username":user.username

    }
    this.http.post(this.url, this.postData).subscribe(
    	data=> {
    		console.log(data);
			const dialogRef = this.dialog.open(RegisterSucsessDialog, {
				width: '500px',
			  });
			  dialogRef.afterClosed().subscribe(() => {
				  //after dialog close
			  });
		},
		err => {
			console.log(err);
			//error
			const dialogRef = this.dialog.open(RegisterFailedDialog, {
				width: '500px',
			  });
			  dialogRef.afterClosed().subscribe(() => {
				  //after dialog close
			  });
				}

		);
 	}

}
@Component({
	selector: 'registerfailed',
	templateUrl: 'registerfailed.html'
  })
  export class RegisterFailedDialog {
  
	constructor(public dialogRef: MatDialogRef<RegisterFailedDialog>
	  , @Inject(MAT_DIALOG_DATA) public data: any) {}
  }
  @Component({
	selector: 'registersucsess',
	templateUrl: 'registersucsess.html'
  })
  export class RegisterSucsessDialog {
  
	constructor(public dialogRef: MatDialogRef<RegisterSucsessDialog>
	  , @Inject(MAT_DIALOG_DATA) public data: any) {}
  }  
