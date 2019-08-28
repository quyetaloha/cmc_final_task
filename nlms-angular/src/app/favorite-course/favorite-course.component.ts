import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Category } from '../model/category';
import { Course } from '../model/course';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StorageService } from '../services/storage.service';
import { User } from '../model/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService} from '../services/api.service';
@Component({
  selector: 'app-favorite-course',
  templateUrl: './favorite-course.component.html',
  styleUrls: ['./favorite-course.component.css']
})
export class FavoriteCourseComponent implements OnInit {

 
  constructor(private http: HttpClient, 
    private dialog: MatDialog, 
    private spinner: NgxSpinnerService,
    private storageService: StorageService,
    private apiService:ApiService) {}
  urlGetCourseListData=this.apiService.domain+"favourites";
  urlGetCategoryListData=this.apiService.domain+"categorys";
  urlDelete=this.apiService.domain+"favourite";
  token:string;
  courses: Course[];
  user:any;
  categorys: Category[];
  selectedCategoryID:string;
  keySearch:any=null;
  tmpKeySearch:any=null;
  courseId;
  ngOnInit() {
    this.spinner.show();
    this.storageService.localStorage.getItem("user").subscribe((user: User) => {
      if(user == null)  //havent logged in yet
        return;
      this.user = user;
      this.storageService.localStorage.getItem("token").subscribe((token: string) => {
        if(token == null)
          return;
        this.token = token;
        this.doCourseData();
        this.doCategoryData();
      });
    });

    
    
  }
  
  delete(courseId:number){
    const dialogRef = this.dialog.open(ConfirmFavDeleteDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        console.log('The dialog was closed by clicking Delete');
        //xu li delete
        let favourite = {
          id:courseId
        }
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': "application/json",
            'Authorization': "Token " + this.token
          }),
          body:favourite
       
         
      } 
        this.courses.splice(this.courseId,1);
        console.log("course delete",this.courses);
        return this.http.delete(this.urlDelete,httpOptions).subscribe((response: HttpResponse<any>) => {
         console.log("delete suscess");
         console.log("respone", response);
       });
    
      }
      else
      {
        console.log('The dialog was closed by clicking Cancel');
      }
        
      //delete
    });

    
  }
  onSearch(){
    this.keySearch=this.tmpKeySearch;
    console.log(this.keySearch)
  }
  onSelectCategory(event,id){
    event.preventDefault();
    this.selectedCategoryID=id;
    console.log(id)
    
  }

  doGetCourseListData() {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Authorization': "Token " + this.token
        })
    }
    return this.http.get(this.urlGetCourseListData,httpOptions);
  }
  doCourseData(){
    let obs: any=this.doGetCourseListData();
    obs.subscribe((response: any) => {
      this.courses=response.data;
      console.log("courses favourites",this.courses);
      this.spinner.hide();

    }, (error: any) => {
      console.log("error",error);
    })
  }
  doGetCategoryListData() {
    let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Authorization': "Token " + this.token
        })
    }
    return this.http.get(this.urlGetCategoryListData,httpOptions);
  }
  doCategoryData(){
    let obs: any=this.doGetCategoryListData();
    obs.subscribe((response: any) => {
      this.categorys=response.data;
      console.log("courses",this.categorys);

    }, (error: any) => {
      console.log("error",error);
    })
  }
}

@Component({
  selector: 'confirmdeletedialog',
  templateUrl: 'confirmdeletedialog.html'
})
export class ConfirmFavDeleteDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmFavDeleteDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}