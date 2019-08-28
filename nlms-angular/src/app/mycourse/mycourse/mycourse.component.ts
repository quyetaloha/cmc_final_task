import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Course } from 'src/app/model/course';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserCourse } from 'src/app/model/user-course';
import { Progress } from 'src/app/model/progress';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.css']
})
export class MycourseComponent implements OnInit {

  listUserCourse: UserCourse[] = [];
  listProgress: Progress[] = [];

  constructor(private storageService: StorageService,
    private spinner: NgxSpinnerService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.spinner.show();
    this.loadData();
  }

  loadData()
  {
    //loading user
    // var obs = this.apiService.authenticate();
    // obs.subscribe((response: HttpResponse<any>) => {
    //   var r : any = response;
    //   this.storageService.currentUser = r.data[0];
    //   this.storageService.token = r.data[1];
    //   //push to local storage
    //   this.storageService.localStorage.setItem("token", this.storageService.token).subscribe(()=>{});
    //   this.storageService.localStorage.setItem("user", this.storageService.currentUser).subscribe(()=>{});
    //   console.log("Token: " + this.storageService.token);
    //   this.spinner.hide();

    //   this.loadCourse(this.storageService.token);
    //   this.loadProgress(this.storageService.token);
    // }, (error: HttpErrorResponse) => {
    //   console.log("error while loading user:");
    //   console.log(error);
    //   alert("An error has occured while loading data, please try again later :(");
    // })
    this.storageService.localStorage.getItem("token").subscribe((token: string) => {
      if(token == null)
        return;
      this.loadCourse(token);
      this.loadProgress(token);
    });
  }
  loadProgress(token: string) {
    var obs = this.apiService.getProgresses(token);
    obs.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.listProgress = r.data;
      this.listProgress.forEach((item: Progress) => {
        item = new Progress(item);

        item.getLessonCount();
        console.log(item.lessonCount);
      })
    }, (error: HttpErrorResponse) => {
      console.log("error while loading progress:");
      console.log(error);
      alert("An error has occured while loading data, please try again later :(");
    })
  }

  loadCourse(token: string)
  {
    var obs = this.apiService.getMyCourse(token);
    obs.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.listUserCourse = r.data;
    }, (error: HttpErrorResponse) => {
      console.log("error while loading usercourse:");
      console.log(error);
      alert("An error has occured while loading data, please try again later :(");
    })
  }

}
