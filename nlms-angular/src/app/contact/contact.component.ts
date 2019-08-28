<<<<<<< HEAD
import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private http: HttpClient, private dialog: MatDialog) { }
  name;
  email;
  message;
  phone;
  urlGetCourseListData = "http://localhost:8080/add-contact";
  ngOnInit() {
  
  }

  contact(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json"
      }),

    }
    var newuser = {
      "name":this.name,
      "email": this.email,
      "message":this.message
    }
    
    console.log("sending contact");
    return this.http.post(this.urlGetCourseListData, newuser, httpOptions);
    
  }

  contactSent(){
  if(this.name==null||this.phone==null||this.email==null||this.message==null){
    alert("please input again ")
  }
  else {
    this.contact().subscribe((response: HttpResponse<any>) => {
      console.log("sent contact suscess");
      console.log("respone",response);
      const dialogRef = this.dialog.open(ContactSuccessDialog, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(() => {
      });
    });
  }
   
  }

}

@Component({
  selector: 'contactsuccessdialog',
  templateUrl: 'contactsuccessdialog.html'
})
export class ContactSuccessDialog {

  constructor(public dialogRef: MatDialogRef<ContactSuccessDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) {}
=======
import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService} from '../services/api.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient, private dialog: MatDialog,private apiService: ApiService) { }
  name;
  email;
  message;
  phone;
  urlGetCourseListData =this.apiService.domain+"add-contact";
  ngOnInit() {
  }

  contact(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json"
      }),

    }
    var newuser = {
      "name":this.name,
      "email": this.email,
      "message":this.message
    }
    console.log("sending contact");
    return this.http.post(this.urlGetCourseListData, newuser, httpOptions);
  }

  contactSent(){
    this.contact().subscribe((response: HttpResponse<any>) => {
      console.log("sent contact suscess");
      console.log("respone",response);
      const dialogRef = this.dialog.open(ContactSuccessDialog, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(() => {
      });
    });
  }

}

@Component({
  selector: 'contactsuccessdialog',
  templateUrl: 'contactsuccessdialog.html'
})
export class ContactSuccessDialog {

  constructor(public dialogRef: MatDialogRef<ContactSuccessDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) {}
>>>>>>> develop
}